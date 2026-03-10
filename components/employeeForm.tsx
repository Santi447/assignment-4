import {Formik} from "formik";
import { View, StyleSheet, Text,TextInput, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";
import { useState } from "react";
  
type employeeFormValues = {
  employeeId: string;
  employeeName:string;
  email:string;
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
   Yup.string().max(50,"Job title must be 50 characters or less").required("employee job title is required"),
  employeeHireDate:
   Yup.string()

})

export default function EmployeeForm(){
  const [showPicker, setShowPicker] = useState(false);
  const INITIALVAlUES: employeeFormValues = {
    employeeId: "",
    employeeName: "",
    email: "",
    employeeJobTitle: "",
    employeeHireDate: ""

  };
  return (
    <View>
      <Formik
        initialValues={INITIALVAlUES}
        validationSchema={employeeFormSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <View>
            <Text style={styles.error}>{errors.employeeId?.toString()}</Text>
            <TextInput
              value={values.employeeId}
              onChangeText={handleChange("employeeId")}
              onBlur={handleBlur("employeeId")}
              style={{ borderWidth: 1, minHeight: 30, minWidth: 200 }}
              placeholder="employee id"
            />
            <Text style={styles.error}>{errors.employeeName?.toString()} </Text>
            <TextInput
              value={values.employeeName}
              onChangeText={handleChange("employeeName")}
              onBlur={handleBlur("employeeName")}
              style={{ borderWidth: 1, minHeight: 30, minWidth: 200 }}
              placeholder="employee name"
            />
            <Text style={styles.error}>{errors.email?.toString()} </Text>
            <TextInput
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={{ borderWidth: 1, minHeight: 30, minWidth: 200 }}
              placeholder="example@example.com"
            />
            <Text style={styles.error}>
              {errors.employeeJobTitle?.toString()}{" "}
            </Text>
            <TextInput
              value={values.employeeJobTitle}
              onChangeText={handleChange("employeeJobTitle")}
              onBlur={handleBlur("employeeJobTitle")}
              style={{ borderWidth: 1, minHeight: 30, minWidth: 200 }}
              placeholder="employee job title"
            />
            <Text style={styles.error}>
              {errors.employeeHireDate?.toString()}{" "}
            </Text>
            <Pressable
              onPress={() => setShowPicker(true)}
              style={styles.hireDatePicker}
            >
              <Text>
                {values.employeeHireDate
                  ? values.employeeHireDate
                  : "Select hire date"}
              </Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                value={
                  values.employeeHireDate
                    ? new Date(values.employeeHireDate)
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) {
                    setFieldValue(
                      "employeeHireDate",
                      selectedDate.toISOString().split("T")[0],
                    );
                  }
                }}
              />
            )}

            {/* {errors?.email && touched?.email && errors.email&&(  <Text style={styles.error}>{errors.email}</Text>)}; */}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    margin: 8,
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  hireDatePicker: {
    borderWidth: 1,
    minHeight: 30,
    minWidth: 200,
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,   
  },
});