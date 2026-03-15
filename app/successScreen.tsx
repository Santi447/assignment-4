import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark-circle" size={64} color="#10B981" />
      </View>

      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>
        Your account has been successfully created. Welcome aboard!
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace("/")}
        activeOpacity={0.85}
      >
        <Text style={styles.btnText}>Sign In Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
  },
  btn: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
