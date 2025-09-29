import "reflect-metadata";
import { sendRequest } from "../../http/sendRequest";
import { BaseModel } from "../base/BaseModel";
import type { PaginatedResponseData, ResponseData } from "@/common/types/ResponseData";
import { BaseService } from "../base/BaseService";

export class RESTService<T extends BaseModel> extends BaseService<T> {

  public async getAll(params: object = {}): Promise<ResponseData> {
    return await sendRequest({
      url: this.url,
      body: params,
    });
  }


  public async getAllPaginated(params: object = {}): Promise<PaginatedResponseData> {
    return await sendRequest({
      url: this.url,
      body: params,
    });
  }
  public async getSelf(params: object = {}) {
    return await sendRequest({
      url: `${this.url}/${this.modelInstance?.getID()}`,
      body: params,
    });
  }

  public async getOne(id: number | string, params: object = {}) {
    return await sendRequest({
      url: `${this.url}/${id}`,
      body: params,
    });
  }

  public async create(data?: object) {
    return await sendRequest({
      method: "POST",
      url: this.url,
      body: data ?? this.modelInstance?.getSavableData(),
    });
  }
  public async update(data?: object, id?: number | string) {
    console.log(id)
    return await sendRequest({
      method: "PATCH",
      url: `${this.url}/${id ?? this.modelInstance?.getID()}`,
      body: data ?? this.modelInstance?.getSavableData(),
    });
  }

  public async delete(id?: number) {
    return await sendRequest({
      method: "DELETE",
      url: `${this.url}/${id ?? this.modelInstance?.getID()
        }`,
    });
  }
  public async validateField(field: string, value: unknown): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
