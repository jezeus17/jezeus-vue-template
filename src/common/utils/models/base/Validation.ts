import type { Schema } from "yup";

export abstract class Validation {
    static create: Schema
    static update: Schema
}