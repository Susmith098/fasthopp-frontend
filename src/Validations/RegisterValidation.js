import * as Yup from "yup";

export const userSchema = Yup.object({
    name: Yup.string()
        .required("Please enter your name")
        .trim(),
    email: Yup.string()
        .matches(/^[\w.-]+@[\w.-]+\.\w+$/, "Please enter a valid email")
        .email("Please enter a valid email")
        .required("Please enter your email")
        .trim(),
    companyName: Yup.string()
        .required("This field is required")
        .trim(),
    password: Yup.string()
        .min(8, "Pasword must be 8 or more characters")
        .max(15)
        .nonNullable()
        .required('Please enter your password'),
})