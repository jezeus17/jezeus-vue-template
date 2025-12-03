import "reflect-metadata";
import { BaseModel } from "../base/BaseModel";
import { supabase } from "@/plugins/supabase-client";

export class SupabaseModel extends BaseModel {


  public async getAllPaginated(
    params: {
      offset: number,
      limit: number,
      relations: string[],
      globalFilter?: string,
      filters?: Record<string, unknown>,
      orderBy?: {
        column: string,
        direction: 'asc' | 'desc'
      }
    }
  ) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : '';
    const searchableFields = this.getSearchableFields();
    let query = supabase
      .from(this.url)
      .select('*' + relations, { count: 'exact' });
    console.log(this.url)
    if (params.globalFilter && params.globalFilter.trim() !== '') {
      const searchTerm = params.globalFilter.trim();
      query = query.or(
        searchableFields.map(field => `${field}.ilike.%${searchTerm}%`).join(',')
      );
    }
    if (params.filters && Object.keys(params.filters).length > 0) {
      this.applyFilters(query, params.filters);
    }

    if (params.orderBy && params.orderBy.column.trim() !== '') {
      query = query.order(params.orderBy.column, {
        ascending: params.orderBy?.direction === 'asc'
      });
    }
    console.log(params)


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
    const searchableFields = this.getSearchableFields();

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
      .eq(this.getFieldAsID(), id)
    console.log(responseData)
    if (error) throw error
    else return responseData
  }
  public async getSelf(params: { relations?: string[] } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    const { data: responseData, error } = await supabase
      .from(this.url)
      .select('*' + relations)
      .eq(this.getFieldAsID(), this.getID())

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

    const data = submitData ?? this.getSavableData()
    const { data: responseData, error } = await supabase
      .from(this.url)
      .insert([data])

    if (error) throw error
    else return responseData
  }

  async update(submitData?: object, id?: number | string) {

    const data = submitData ?? this.getSavableData()
    const recordId = id ?? this.getID()
    const { data: responseData, error } = await supabase
      .from(this.url)
      .update([data])
      .eq(this.getFieldAsID(), recordId)
    if (error) throw error
    else return responseData
  }

  async delete(id?: number) {
    const recordId = id ?? this.getID()
    const { data: responseData, error } = await supabase
      .from(this.url)
      .delete()
      .eq(this.getFieldAsID(), recordId)

    if (error) throw error
    else return responseData
  }

  async validateField(field: string, value: unknown) {
    const { data, error } = await supabase
      .from(this.url)
      .select(this.getFieldAsID())
      .eq(field, value)
      .limit(1)
    if (error) throw error
    const possibleEqualRow = data[0]
    return !possibleEqualRow || possibleEqualRow[this.getFieldAsID()] === this.getID()
  }




  private applyFilters(query: any, filters: Record<string, unknown>) {

    for (const [field, value] of Object.entries(filters)) {
      if (value === null || value === undefined || value === '') {
        continue;
      }
      else {
        if (field.includes('fk') || field.endsWith('_id')) {
          query.eq(field, value);
        } else {
          query.ilike(field, `%${value}%`);
        }
      }
    }

  }

}
