import { object, Schema } from "yup";
import "reflect-metadata";
import type ColumnProps from "@/components/table/types/ColumnProps";
import type { PaginatedResponseData, ResponseData } from "../types/ResponseData";

export abstract class BaseModel {
  [key: string]: unknown;
  static readonly url: string = "base";
  static readonly locales: object = {};
  static readonly columns: Array<ColumnProps> | null = null;
  static readonly schema: Schema = object();

  constructor(data?: object) {
    if (data) this.setData(data);
  }

  public setData(data: object): void {
    Object.assign(this, data);
  }

  public clearData(): void {
    for (const key in this) {
      if (Array.isArray(this[key])) {
        (this[key] as unknown) = [];
      } else {
        (this[key] as unknown) = undefined;
      }
    }
  }

  public getID() {
    return this[this.getFieldAsID()];
  }
  public getLocales() {
    return (this.constructor as typeof BaseModel).locales;
  }

  public getURL() {
    return (this.constructor as typeof BaseModel).url;
  }

  public getFieldAsID() {
    const properties = Object.getOwnPropertyNames(this);
    for (const property of properties) {
      if (Reflect.getMetadata("fieldAsID", this, property)) {
        return property;
      }
    }
    throw new Error("Not Found");
  }

  public getFieldAsActive() {
    const properties = Object.getOwnPropertyNames(this);
    for (const property of properties) {
      if (Reflect.getMetadata("fieldAsActive", this, property)) {
        return property;
      }
    }
    return "";
  }
  public getSavableData() {
    const submitData = { ...this };
    Object.keys(submitData).forEach((key) => {
      if (Reflect.getMetadata("notSavableField", this, key)) {
        delete submitData[key];
      }
    });
    return submitData;
  }

  public getColumns() {
    return (this.constructor as typeof BaseModel).columns;
  }
  public getFilters() {
    const filters = this.getColumns()?.filter((c) => c.filter);
    return filters?.map((c) => { return { ...c, filterMode: c.filterMode ? c.filterMode : 'like' } });
  }
  public getSchema() {
    return (this.constructor as typeof BaseModel).schema;
  }

  public getActive() {
    return this[this.getFieldAsActive()];
  }

  public getUpdateSchema() {
    return this.getSchema();
  }

  abstract getAll(params: object): Promise<ResponseData>
  abstract getAllPaginated(params?: object): Promise<PaginatedResponseData>
  abstract getOne(id: number | string, params?: object): Promise<object>
  abstract getSelf(params?: object): Promise<object>
  abstract create(data?: object): void
  abstract update(data?: object, id?: number | string): void
  abstract delete(id?: number): void
}
