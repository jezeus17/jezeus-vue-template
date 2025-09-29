import "reflect-metadata";
import { BaseModel } from "../base/BaseModel";
import { supabase } from "@/plugins/supabase-client";
import { BaseService } from "../base/BaseService";

export class SupabaseService<T extends BaseModel> extends BaseService<T> {


  public async getAllPaginated(
    params: {
      offset: number,
      limit: number,
      relations: string[],
      globalFilter?: string,
      orderBy?: {
        column: string,
        direction: 'asc' | 'desc'
      }
    }
  ) {
    console.log(params)
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : '';

    const searchableFields = this.modelInstance.getSearchableFields();

    let query = supabase
      .from(this.url)
      .select('*' + relations, { count: 'exact' });

    if (params.globalFilter && params.globalFilter.trim() !== '') {
      const searchTerm = params.globalFilter.trim();
      query = query.or(
        searchableFields.map(field => `${field}.ilike.%${searchTerm}%`).join(',')
      );
    }

    if (params.orderBy && params.orderBy.column.trim() !== '') {
      query = query.order(params.orderBy.column, {
        ascending: params.orderBy?.direction === 'asc'
      });
    }

    const { count: totalElements, error: countError, data } = await query
      .range(params.offset, params.offset + params.limit - 1);

    if (countError) throw countError;

    const totalPages = Math.ceil((totalElements || 0) / params.limit);

    return {
      pages: totalPages,
      actual_page: Math.floor(params.offset / params.limit) + 1,
      elements_amount: totalElements || 0,
      data: data || []
    };
  }


  public async getAll(params: {
    relations?: string[], globalFilter?: string, orderBy?: {
      column: string,
      direction: 'asc' | 'desc'
    }
  } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    let query = supabase
      .from(this.url)
      .select('*' + relations, { count: 'exact' });
    const searchableFields = this.modelInstance.getSearchableFields();

    if (params.globalFilter && params.globalFilter.trim() !== '') {
      const searchTerm = params.globalFilter.trim();
      query = query.or(
        searchableFields.map(field => `${field}.ilike.%${searchTerm}%`).join(',')
      );
    }
    if (params.orderBy && params.orderBy?.column.trim() !== '') {
      query = query.order(params.orderBy.column, {
        ascending: params.orderBy?.direction === 'asc'
      });
    }
    const { data, error } = await query.select()

    if (error) throw error
    else
      return { data }
  }



  public async getOne(id: number | string, params: { relations?: string[] } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    const { data: responseData, error } = await supabase
      .from(this.url)
      .select('*' + relations)
      .eq(this.modelInstance.getFieldAsID(), id)
    console.log(responseData)
    if (error) throw error
    else return responseData
  }
  public async getSelf(params: { relations?: string[] } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    const { data: responseData, error } = await supabase
      .from(this.url)
      .select('*' + relations)
      .eq(this.modelInstance.getFieldAsID(), this.modelInstance.getID())

    if (error) throw error
    else return responseData
  }

  // static async getOne(id: number | string, params: object = {}) {
  //   return await sendRequest({
  //     url: `${this.url}/${id}`,
  //     body: params,
  //   });
  // }

  async create(submitData?: object) {

    const data = submitData ?? this.modelInstance.getSavableData()
    const { data: responseData, error } = await supabase
      .from(this.url)
      .insert([data])

    if (error) throw error
    else return responseData
  }

  async update(submitData?: object, id?: number | string) {

    const data = submitData ?? this.modelInstance.getSavableData()
    const recordId = id ?? this.modelInstance.getID()
    const { data: responseData, error } = await supabase
      .from(this.url)
      .update([data])
      .eq(this.modelInstance.getFieldAsID(), recordId)
    if (error) throw error
    else return responseData
  }

  async delete(id?: number) {
    const recordId = id ?? this.modelInstance.getID()
    const { data: responseData, error } = await supabase
      .from(this.url)
      .delete()
      .eq(this.modelInstance.getFieldAsID(), recordId)

    if (error) throw error
    else return responseData
  }

  async validateField(field: string, value: unknown) {
    const { data, error } = await supabase
      .from(this.url)
      .select(this.modelInstance.getFieldAsID())
      .eq(field, value)
      .limit(1)
    if (error) throw error
    const possibleEqualRow = data[0]
    return !possibleEqualRow || possibleEqualRow[this.modelInstance.getFieldAsID()] === this.modelInstance.getID()
  }
}
