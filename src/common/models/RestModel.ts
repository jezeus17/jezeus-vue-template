import "reflect-metadata";
import { sendRequest } from "../http/sendRequest";
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
  public async getAllPaginated(params: object = {}) {
    return await sendRequest({
      url: this.getURL(),
      body: params,
    });
  }
  async getSelf(params: object = {}) {
    return await sendRequest({
      url: `${this.getURL()}/${this.getID()}`,
      body: params,
    });
  }

  async getOne(id: number | string, params: object = {}) {
    return await sendRequest({
      url: `${this.getURL()}/${id}`,
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
