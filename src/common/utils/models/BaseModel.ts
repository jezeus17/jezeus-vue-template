import { object, Schema } from "yup";
import "reflect-metadata";
import type ColumnProps from "@/components/table/ColumnProps";

export abstract class BaseModel {
  static readonly url: string = "base";
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

  abstract getAll(params: object): void
  abstract getAllPaginated(params: object): void
  abstract getOne(id: number | string, params: object): void
  abstract create(data?: object): void
  abstract update(data?: object, id?: number | string): void
  abstract delete(id?: number): void
}
