import { Text, View, } from "react-native";
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
  
    </View>
  );
}
