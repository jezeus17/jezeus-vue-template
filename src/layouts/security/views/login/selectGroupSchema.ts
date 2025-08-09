import { number, object } from "yup";

export const selectGroupSchema = object({
    group: number().required(),
  });