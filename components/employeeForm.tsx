import Formik from "formik";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
  
type employeeFormValues = {
  employeeId: string;
  employeeName:string;
  employeeEmail:string;
  employeeJobTitle:string;
  employeeHireDate:string;
}
const employeeFormSchema = Yup.object({
  
})

export default function  EmployeeForm(){
  return(

  <View></View>
  );
}

const styles = StyleSheet.create({

});