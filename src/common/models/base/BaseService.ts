import type { PaginatedResponseData, ResponseData } from "@/common/types/ResponseData";
import type { BaseModel } from "./BaseModel";
import { object, ObjectSchema } from "yup";

export abstract class BaseService<T extends BaseModel> {
    static readonly url: string = "base";
    protected schema = object()
    protected updateSchema = object()
    constructor(
        protected modelInstance: T
    ) {
        this.schema = this.setSchema(this.modelInstance.getSchema())
        this.updateSchema = this.setSchema(this.modelInstance.getUpdateSchema())
    }
    abstract getAll(params?: object): Promise<ResponseData>;
    abstract getAllPaginated(params?: object): Promise<PaginatedResponseData>;
    abstract getOne(id: number | string, params?: object): Promise<T>;
    abstract getSelf(params?: object): Promise<T>;
    abstract create(data?: object): Promise<unknown>;
    abstract update(data?: object, id?: number | string): Promise<unknown>;
    abstract delete(id?: number): Promise<unknown>;
    abstract validateField(field: string, value: unknown): Promise<boolean>;

    public getModel(): T {
        return this.modelInstance
    }

    public getSchema() {
        console.log(this.schema)
        return this.schema;
    }

    public getUpdateSchema() {
        return this.updateSchema;
    }
    public get url() {
        return (this.constructor as typeof BaseService).url;
    }


    private setSchema(modelSchema: ObjectSchema<object>) {
        let returnSchema = modelSchema
        this.modelInstance.getUniqueFields().forEach(field => {
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