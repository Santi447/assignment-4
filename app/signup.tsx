import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

// ---------------------------------------------------------------------------
// Yup validation schema
// ---------------------------------------------------------------------------
const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

// ---------------------------------------------------------------------------
// Reusable FormField component
// ---------------------------------------------------------------------------
interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "words" | "sentences" | "characters";
  icon: keyof typeof Ionicons.glyphMap;
  rightElement?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "none",
  icon,
  rightElement,
}) => {
  const hasError = touched && error;

  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, hasError ? styles.inputRowError : null]}>
        <Ionicons
          name={icon}
          size={18}
          color={hasError ? "#EF4444" : "#94A3B8"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
        {rightElement}
      </View>
      {hasError && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={13} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

// ---------------------------------------------------------------------------
// Main SignUpScreen
// ---------------------------------------------------------------------------
export default function SignUpScreen() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      // Mock API call
      await new Promise((res) => setTimeout(res, 1500));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log("Registered:", values);
      resetForm();
      // Navigate to success screen after brief delay
      setTimeout(() => {
        setSubmitSuccess(false);
        router.push("/successScreen");
      }, 1000);
    },
  });

  const isFormValid = formik.isValid && Object.keys(formik.touched).length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="person-add" size={32} color="#6366F1" />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join us today — it only takes a minute
          </Text>
        </View>

        {/* ── Form Card ── */}
        <View style={styles.card}>
          {/* Full Name */}
          <FormField
            label="Full Name"
            placeholder="Jane Doe"
            value={formik.values.fullName}
            onChangeText={formik.handleChange("fullName")}
            onBlur={formik.handleBlur("fullName")}
            error={formik.errors.fullName}
            touched={formik.touched.fullName}
            icon="person-outline"
            autoCapitalize="words"
            keyboardType="default"
          />

          {/* Email */}
          <FormField
            label="Email Address"
            placeholder="jane@example.com"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            error={formik.errors.email}
            touched={formik.touched.email}
            icon="mail-outline"
            keyboardType="email-address"
          />

          {/* Password */}
          <FormField
            label="Password"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            error={formik.errors.password}
            touched={formik.touched.password}
            icon="lock-closed-outline"
            secureTextEntry={!showPassword}
            rightElement={
              <TouchableOpacity
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            }
          />

          {/* Confirm Password */}
          <FormField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            icon="shield-checkmark-outline"
            secureTextEntry={!showConfirmPassword}
            rightElement={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((v) => !v)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            }
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitBtn,
              (!isFormValid || isSubmitting) && styles.submitBtnDisabled,
              submitSuccess && styles.submitBtnSuccess,
            ]}
            onPress={() => formik.handleSubmit()}
            disabled={!isFormValid || isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : submitSuccess ? (
              <View style={styles.btnRow}>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.submitBtnText}>Account Created!</Text>
              </View>
            ) : (
              <Text style={styles.submitBtnText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Reset Link */}
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => {
              formik.resetForm();
              setSubmitSuccess(false);
            }}
          >
            <Text style={styles.resetText}>Clear Form</Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },

  // Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
    gap: 4,
  },

  // Field
  fieldWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputRowError: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FFF5F5",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    height: "100%",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    flexShrink: 1,
  },

  // Submit
  submitBtn: {
    backgroundColor: "#6366F1",
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnDisabled: {
    backgroundColor: "#A5B4FC",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnSuccess: {
    backgroundColor: "#10B981",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  // Reset
  resetBtn: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 4,
  },
  resetText: {
    fontSize: 13,
    color: "#94A3B8",
    textDecorationLine: "underline",
  },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#64748B",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6366F1",
  },
});
