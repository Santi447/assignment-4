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
   Yup.string().max(5).required("employee id is required"),
  email:
   Yup.string().email(),
  employeeName:
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
    <Formik initialValues={INITIALVAlUES} 
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
          <Text style={styles.error}>{errors.employeeId?.toString()}</Text>
          <TextInput 
          value={values.employeeId}
          onChangeText={handleChange("employeeId")}
          onBlur={handleBlur("employeeId")}
          style={{borderWidth:1,minHeight:30,minWidth:200}}
          placeholder="employee id"
          />
          {errors?.employeeId && touched?.employeeId && errors.employeeId};
          <Text style={styles.error}>{errors.employeeName?.toString()} </Text>
          <TextInput
          value={values.employeeName}
          onChangeText={handleChange("employeeName")}
          onBlur={handleBlur("employeeName")}
          style={{borderWidth:1,minHeight:30,minWidth:200}}
          placeholder="employee name"
          />
          {errors?.employeeName && touched?.employeeName && errors.employeeName};
        </View>
        
      )
      }
    </Formik>
  </View>
  );
}

const styles = StyleSheet.create({
  error:{
    
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold'
  }

});