import {Formik} from "formik";
import { View, StyleSheet, Text,TextInput } from "react-native";
import * as Yup from "yup";
  
type employeeFormValues = {
  employeeId: string;
  employeeName:string;
  employeeEmail:string;
  employeeJobTitle:string;
  employeeHireDate:string;
}
const employeeFormSchema = Yup.object({
  employeeId:
   Yup.string().max(5),
  email:
   Yup.string().email(),
  emplyeeName:
   Yup.string().max(28),
  employeeJobTitle:
   Yup.string().max(50),
  employeeHireDate:
   Yup.string().datetime()

})

export default function EmployeeForm(){
  const INITIALVAlUES: employeeFormValues = {
    employeeId: "",
    employeeName: "",
    employeeEmail: "",
    employeeJobTitle: "",
    employeeHireDate: ""

  };
  return(
  <View>
    <Formik initialValues={{INITIALVAlUES}} 
    validationSchema={employeeFormSchema} onSubmit={(values) => {
      console.log(values);
    }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <View>
          <Text>EmployeeId:</Text>
          <TextInput 
          value={values.INITIALVAlUES.employeeId}
          onChangeText={handleChange("employeeId")}
          onBlur={handleBlur("employeeId")}
          style={{borderWidth:1,minHeight:30,minWidth:200}}

          />

        </View>
      )
      }
    </Formik>
  </View>
  );
}

const styles = StyleSheet.create({

});