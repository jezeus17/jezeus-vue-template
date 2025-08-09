import "reflect-metadata";
import { BaseModel } from "./BaseModel";
import { supabase } from "@/plugins/supabase-client";

export class SupabaseModel extends BaseModel {


  public getSavableData() {
    const submitData = { ...this };
    delete submitData[this.getFieldAsID()]
    Object.keys(submitData).forEach((key) => {
      if (Reflect.getMetadata("notSavableField", this, key)) {
        delete submitData[key];
      }
    });
    return submitData;
  }


  public async getAllPaginated(params: { offset: number, limit: number, relations: string[] }) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    const { count: totalElements, error: countError } = await supabase
      .from(this.getURL())
      .select('*', { count: 'exact', head: true })
    if (countError) throw countError
    console.log(relations)
    const { data, error } = await supabase
      .from(this.getURL())
      .select('*' + relations)
      .range(params.offset, params.offset + params.limit - 1)

    if (error || totalElements == null) throw error
    else {
      const totalPages = Math.ceil(totalElements / params.limit)
      return {
        pages: totalPages,
        actual_page: params.offset,
        elements_amount: totalElements,
        data: data || []
      }
    }

  }


  public async getAll(params: { relations?: string[] } = {}) {
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''

    const { data, error } = await supabase
      .from(this.getURL())
      .select('*' + relations)

    if (error) throw error
    else
      return data
  }



  public async getOne(id?: number | string, params: { relations?: string[] } = {}) {
    const recordId = id ?? this.getID()
    const relations = params.relations ? ' ,' + (params.relations.map(relation => `${relation}:${relation} (*)`).join(',')) : ''
    const { data: responseData, error } = await supabase
      .from(this.getURL())
      .select('*' + relations)
      .eq(this.getFieldAsID(), recordId)

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
      .from('animal')
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
