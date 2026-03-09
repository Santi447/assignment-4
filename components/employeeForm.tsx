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

export default function  EmployeeForm(){
  const initalValues: employeeFormValues {
    employeeId

  }
  return(

  <Formik
  initialValues=
  >

  </Formik>
  );
}

const styles = StyleSheet.create({

});