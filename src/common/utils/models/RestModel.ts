import "reflect-metadata";
import { sendRequest } from "../sendRequest";
import { BaseModel } from "./BaseModel";

export class RESTModel extends BaseModel {

  public async getAll(params: object = {}) {
    return await sendRequest({
      url: this.getURL(),
      body: params,
    });
  }
  public static async getAll(params: object = {}) {
    return await sendRequest({
      url: this.url,
      body: params,
    });
  }
  public static async getAllPaginated(params: object = {}) {
    return await sendRequest({
      url: this.url,
      body: params,
    });
  }
  async getOne(params: object = {}) {
    return await sendRequest({
      url: `${this.getURL()}/${this.getID()}`,
      body: params,
    });
  }

  static async getOne(id: number | string, params: object = {}) {
    return await sendRequest({
      url: `${this.url}/${id}`,
      body: params,
    });
  }

  async create(data?: object) {
    return await sendRequest({
      method: "POST",
      url: this.getURL(),
      body: data ?? this.getSavableData(),
    });
  }
  async update(data?: object, id?: number | string) {
    console.log(id)
    return await sendRequest({
      method: "PATCH",
      url: `${this.getURL()}/${id ?? this.getID()}`,
      body: data ?? this.getSavableData(),
    });
  }

  async delete(id?: number) {
    return await sendRequest({
      method: "DELETE",
      url: `${this.getURL()}/${id ?? this.getID()
        }`,
    });
  }
}
