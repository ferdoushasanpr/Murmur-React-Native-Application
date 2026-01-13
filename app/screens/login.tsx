import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleAuth = () => {
    if (loading) return;

    setLoading(true);
    if (isLogin) {
      axios
        .post(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/signin`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const { token } = response.data;
          const userId = response.data.data.user._id;

          login(userId, token);

          console.log("Global State Updated:", { userId, token });
          router.replace("/screens/(tabs)/Timeline");
        })
        .catch((error) => {
          setMessage(
            error.response.data.message || "Error logging in. Please try again."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/signup`,
          { name, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const { token } = response.data;
          const userId = response.data.data.user._id;

          login(userId, token);

          console.log("Global State Updated:", { userId, token });
          router.replace("/screens/(tabs)/Timeline");
        })
        .catch((error) => {
          console.log("STATUS:", error.response?.status);
          console.log("DATA:", error.response?.data);
          console.log("HEADERS:", error.response?.headers);
          setMessage(
            error.response.data.message || "Error signing up. Please try again."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.innerContainer}>
      <View style={styles.headerArea}>
        <Text style={styles.logoText}>Murmur</Text>
        <Text style={styles.subtitleText}>
          {isLogin ? "Whisper into the void." : "Join the silence."}
        </Text>
      </View>

      <View style={styles.form}>
        <View style={{ marginBottom: 15 }}>
          <Text style={{ color: "red", textAlign: "center" }}>{message}</Text>
        </View>
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#7a7a7a"
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7a7a7a"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7a7a7a"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isLogin ? "Log In" : "Create Account"}
          </Text>
        </TouchableOpacity>

        {isLogin && (
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </Text>
        <TouchableOpacity onPress={toggleMode}>
          <Text style={styles.footerText && { color: "#BB86FC" }}>
            {isLogin ? "Create Account" : "Log In"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  headerArea: {
    marginBottom: 40,
    alignItems: "center",
  },
  logoText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#BB86FC",
    letterSpacing: 2,
  },
  subtitleText: {
    color: "#a1a1a1",
    fontSize: 16,
    marginTop: 5,
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    backgroundColor: "#BB86FC",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotBtn: {
    marginTop: 15,
    alignItems: "center",
  },
  forgotText: {
    color: "#7a7a7a",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerText: {
    color: "#a1a1a1",
    fontSize: 14,
  },
  signupText: {
    color: "#BB86FC",
    fontSize: 14,
    fontWeight: "bold",
  },
});
