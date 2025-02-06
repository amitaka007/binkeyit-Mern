import * as Yup from  'yup';

export const LoginFormSchema = Yup.object({
    email :Yup.string().email("Invalid email address").required('Email is required'),
    password: Yup.string().required("Password is Required").min(5, "Password must be at least 5 characters"),
})