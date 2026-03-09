import { Text, View, } from "react-native";
import EmployeeForm from "../components/employeeForm";
import * as Yup from "yup";
import Formik from "formik";

type LoginValues = {
  email : string;
  password : string;
};

const loginSchema = Yup.object({
  email: Yup.string()
  .email("enter a valid email.")
  .required("email is required"),
  password: Yup.string()
  .min(6,"Min 6 characters")
  .required("password is required")
 })


export default function Index() {
  const initalValues: LoginValues = {email: "", password: ""};

  return (
    <EmployeeForm/>
  );
}
