import { number, object, string } from "yup";

export const signUpSchema = object({
    CI:string().required(),
        email: string().required().email(),
        name: string().required(),
        sex: string().required(),
        password: string().required().min(8),
        last_name: string().required(),
        country_id: number().integer().required(),
        name_group: string().required(),
  });