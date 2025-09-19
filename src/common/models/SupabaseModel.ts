import "reflect-metadata";
import { BaseModel } from "./BaseModel";
import { supabase } from "@/plugins/supabase-client";

export class SupabaseModel extends BaseModel {


  public async getAllPaginated(
    params: {
      offset: number,
      limit: number,
      relations: string[],
      globalFilter?: string
    }
  ) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : '';

    const searchableFields = this.getSearchableFields();

    let query = supabase
      .from(this.getURL())
      .select('*' + relations, { count: 'exact' });

    if (params.globalFilter && params.globalFilter.trim() !== '') {
      const searchTerm = params.globalFilter.trim();
      query = query.or(
        searchableFields.map(field => `${field}.ilike.%${searchTerm}%`).join(',')
      );
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


  public async getAll(params: { relations?: string[], globalFilter?: string } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    let query = supabase
      .from(this.getURL())
      .select('*' + relations, { count: 'exact' });
    const searchableFields = this.getSearchableFields();

    if (params.globalFilter && params.globalFilter.trim() !== '') {
      const searchTerm = params.globalFilter.trim();
      query = query.or(
        searchableFields.map(field => `${field}.ilike.%${searchTerm}%`).join(',')
      );
    }
    const { data, error } = await query.select()

    if (error) throw error
    else
      return { data }
  }



  public async getOne(id: number | string, params: { relations?: string[] } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    const { data: responseData, error } = await supabase
      .from(this.getURL())
      .select('*' + relations)
      .eq(this.getFieldAsID(), id)

    if (error) throw error
    else return responseData
  }
  public async getSelf(params: { relations?: string[] } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    const { data: responseData, error } = await supabase
      .from(this.getURL())
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
      .from(this.getURL())
      .insert([data])

    if (error) throw error
    else return responseData
  }

  async update(submitData?: object, id?: number | string) {

    const data = submitData ?? this.getSavableData()
    const recordId = id ?? this.getID()
    const { data: responseData, error } = await supabase
      .from(this.getURL())
      .update([data])
      .eq(this.getFieldAsID(), recordId)
    if (error) throw error
    else return responseData
  }

  async delete(id?: number) {
    const recordId = id ?? this.getID()
    const { data: responseData, error } = await supabase
      .from(this.getURL())
      .delete()
      .eq(this.getFieldAsID(), recordId)

    if (error) throw error
    else return responseData
  }
}
