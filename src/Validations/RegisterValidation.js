import * as Yup from "yup";

export const userSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    companyName: Yup.string().required(),
    password: Yup.string().min(4).required(),
})