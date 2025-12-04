import { object, ObjectSchema } from "yup";
import "reflect-metadata";
import type ColumnProps from "@/components/table/types/ColumnProps";
import type { PaginatedResponseData, ResponseData } from "@/common/types/ResponseData";

export abstract class BaseModel {
  [key: string]: unknown;
  static readonly locales: object = {};
  static readonly columns: Array<ColumnProps> | null = null;
  static readonly schema = object();
  static readonly url: string = "base";


  constructor(data?: object) {
    if (data) this.setData(data);
  }

  public get url() {
    return (this.constructor as typeof BaseModel).url;
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
    return this[this.getFieldAsID()] as string | number;
  }
  public getLocales() {
    return (this.constructor as typeof BaseModel).locales;
  }


  public getFieldAsID(): string {
    const properties = Object.getOwnPropertyNames(this);
    for (const property of properties) {
      if (Reflect.getMetadata("fieldAsID", this, property)) {
        return property;
      }
    }
    throw new Error("Not Found");
  }
  public getFieldAsLabel() {
    const properties = Object.getOwnPropertyNames(this);
    for (const property of properties) {
      if (Reflect.getMetadata("fieldAsLabel", this, property)) {
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
  public getForeignKey(propertyName?: string) {
    const properties = Object.keys(this);

    for (const key of properties) {
      const isFk = Reflect.getMetadata("isForeignKey", this.constructor.prototype, key);
      if (isFk && key === propertyName) {
        const targetClass = Reflect.getMetadata("design:type", this.constructor.prototype, key);
        return {
          propertyName: key,
          targetClass: targetClass,
          className: targetClass?.name
        }
      }
    }
  }

  public getForeignKeyModel(field: string) {
    const foreignKey = this.getForeignKey(field);
    const TargetClass = foreignKey?.targetClass as new () => BaseModel;
    return new TargetClass();
  };

  public getForeignKeyFieldAsLabel(field: string) {
    const foreignKeyModel = this.getForeignKeyModel(field)
    return foreignKeyModel.getFieldAsLabel();
  };

  public isUniqueField(key: string) {
    return Reflect.getMetadata("uniqueField", this, key)
  }
  public isForeignKey(key: string) {
    return Reflect.getMetadata("isForeignKey", this, key)
  }

  public getColumns() {
    return (this.constructor as typeof BaseModel).columns;
  }
  public getFilters() {
    const filters = this.getColumns()?.filter((c) => c.filter);
    return filters?.map((c) => { return { ...c, filterMode: c.filterMode ? c.filterMode : 'like' } });
  }
  public getSchema() {
    return this.getSchemaWithUniqueFields((this.constructor as typeof BaseModel).schema);
  }

  public getActive() {
    return this[this.getFieldAsActive()];
  }

  public getUpdateSchema() {
    return this.getSchemaWithUniqueFields((this.constructor as typeof BaseModel).schema);
  }

  abstract getAll(params?: object): Promise<ResponseData>;
  abstract getAllPaginated(params?: object): Promise<PaginatedResponseData>;
  abstract getOne(id: number | string, params?: object): Promise<unknown>;
  abstract getSelf(params?: object): Promise<unknown>;
  abstract create(data?: object): Promise<unknown>;
  abstract update(data?: object, id?: number | string): Promise<unknown>;
  abstract delete(id?: number): Promise<unknown>;
  abstract validateField(field: string, value: unknown): Promise<boolean>;

  private getSchemaWithUniqueFields(modelSchema: ObjectSchema<object>) {
    let returnSchema = modelSchema
    this.getUniqueFields().forEach(field => {
      returnSchema = modelSchema.shape({
        [field]: modelSchema.fields[field].test(
          'error.unique',
          'error.unique',
          async (value: unknown) => {
            if (!value) return true;
            return await this.validateField(field, value);
          }
        )

      })
    })
    return returnSchema
  }
}
