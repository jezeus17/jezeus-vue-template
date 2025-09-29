import { object } from "yup";
import "reflect-metadata";
import type ColumnProps from "@/components/table/types/ColumnProps";

export class BaseModel {
  [key: string]: unknown;
  static readonly locales: object = {};
  static readonly columns: Array<ColumnProps> | null = null;
  static readonly schema = object();

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
      if (Reflect.getMetadata("notSavableField", this, key) || Reflect.getMetadata("fieldAsID", this, key)) {
        delete submitData[key];
      }
    });
    return submitData;
  }
  public getSearchableFields() {
    const submitData = { ...this };
    return Object.keys(submitData).filter((key) => {
      if (!Reflect.getMetadata("notSearchableField", this, key) && !Reflect.getMetadata("fieldAsID", this, key)) {
        return key;
      }
    });
  }
  public getUniqueFields() {
    const submitData = { ...this };
    return Object.keys(submitData).filter((key) => {
      if (Reflect.getMetadata("uniqueField", this, key)) {
        return key;
      }
    });
  }
  public isUniqueField(key: string) {
    return Reflect.getMetadata("uniqueField", this, key)
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

}
