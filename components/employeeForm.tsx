import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Formik } from "formik";
import { useState } from "react";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import * as Yup from "yup";

type employeeFormValues = {
  employeeId: string;
  employeeName: string;
  email: string;
  employeeJobTitle: string;
  employeeHireDate: string;
};
const employeeFormSchema = Yup.object({
  employeeId: Yup.string().max(5).required("employee id is required"),
  email: Yup.string().email().required("email is required"),
  employeeName: Yup.string()
    .max(28, "employee name must be 28 characters or less")
    .required("employee name is required"),
  employeeJobTitle: Yup.string()
    .max(50, "Job title must be 50 characters or less")
    .required("employee job title is required"),
  employeeHireDate: Yup.string(),
});

export default function EmployeeForm() {
  const [showPicker, setShowPicker] = useState(false);
  const INITIALVAlUES: employeeFormValues = {
    employeeId: "",
    employeeName: "",
    email: "",
    employeeJobTitle: "",
    employeeHireDate: "",
  };
  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={INITIALVAlUES}
        validationSchema={employeeFormSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          console.log(values);
          router.push("/employeeFormSuccessScreen");
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
          <View style={styles.innerContainer}>
            <View style={styles.label}>
              <Text>Employee ID</Text>
              <Ionicons name="id-card" size={20} color="black" />
            </View>
            <TextInput
              value={values.employeeId}
              onChangeText={handleChange("employeeId")}
              onBlur={handleBlur("employeeId")}
              style={[
                styles.input,
                touched.employeeId && errors.employeeId
                  ? styles.inputError
                  : null,
              ]}
              placeholder="employee id"
              placeholderTextColor="#aaa"
            />
            {touched.employeeId && errors.employeeId && (
              <Text style={styles.error}>{errors.employeeId}</Text>
            )}
            <View style={styles.label}>
            <Text >Employee Name</Text>
            <Ionicons name="person" size={20} color="black" />
            </View>
            <TextInput
              value={values.employeeName}
              onChangeText={handleChange("employeeName")}
              onBlur={handleBlur("employeeName")}
              style={[
                styles.input,
                touched.employeeName && errors.employeeName
                  ? styles.inputError
                  : null,
              ]}
              placeholder="employee name"
              placeholderTextColor="#aaa"
            />
            {touched.employeeName && errors.employeeName && (
              <Text style={styles.error}>{errors.employeeName}</Text>
            )}
            <View style={styles.label}>
            <Text >Email</Text>
            <Ionicons name="mail" size={20} color="black" />
            </View>
            <TextInput
              value={values.email}
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={[
                styles.input,
                touched.email && errors.email ? styles.inputError : null,
              ]}
              placeholder="example@example.com"
              placeholderTextColor="#aaa"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <View style={styles.label}>
            <Text>Job Title</Text>
            <Ionicons name="briefcase" size={20} color="black" />
            </View>
            <TextInput
              value={values.employeeJobTitle}
              onChangeText={handleChange("employeeJobTitle")}
              onBlur={handleBlur("employeeJobTitle")}
              style={[
                styles.input,
                touched.employeeJobTitle && errors.employeeJobTitle
                  ? styles.inputError
                  : null,
              ]}
              placeholder="employee job title"
              placeholderTextColor="#aaa"
            />
            {touched.employeeJobTitle && errors.employeeJobTitle && (
              <Text style={styles.error}>{errors.employeeJobTitle}</Text>
            )}
            <View style={styles.label}>
            <Text >Hire Date</Text>
            <Ionicons name="calendar" size={20} color="black" />
            </View>
            <Pressable
              onPress={() => setShowPicker(true)}
              style={styles.hireDatePicker}
            >
              <Text style={styles.hireDateText}>
                {values.employeeHireDate
                  ? values.employeeHireDate
                  : "Select hire date"}
              </Text>
            </Pressable>
            {touched.employeeHireDate && errors.employeeHireDate && (
              <Text style={styles.error}>{errors.employeeHireDate}</Text>
            )}

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

            <Pressable
              style={[
                styles.button,
                isSubmitting ? styles.buttonDisabled : null,
              ]}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
    padding: 24,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 16,
    color: "#222",
    flexDirection: "row",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d8e0",
    borderRadius: 6,
    minHeight: 40,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: "#f7f7f7",
    marginBottom: 4,
  },
  inputError: {
    borderColor: "#e84118",
  },
  error: {
    marginBottom: 8,
    fontSize: 13,
    color: "#e84118",
    fontWeight: "500",
  },
  hireDatePicker: {
    borderWidth: 1,
    borderColor: "#d1d8e0",
    minHeight: 40,
    borderRadius: 6,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#f7f7f7",
    marginBottom: 4,
  },
  hireDateText: {
    color: "#222",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#273c75",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: "#718093",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
