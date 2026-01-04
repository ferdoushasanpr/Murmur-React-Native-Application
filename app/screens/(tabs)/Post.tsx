import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function Post() {
  const [content, setContent] = useState("");
  const router = useRouter();
  const MAX_CHARS = 280;

  const { token } = useAuth();

  const onSubmit = () => {
    console.log("TOKEN VALUE:", token);
    console.log("TOKEN TYPE:", typeof token);

    axios
      .post(
        "http://10.0.2.2:3000/murmurs/me",
        { content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Murmur posted successfully:", response.data);
        setContent("");
        router.back();
      })
      .catch((error) => {
        console.error("Error posting murmur:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.murmurButton,
              { opacity: content.length > 0 ? 1 : 0.5 },
            ]}
            disabled={content.length === 0}
            onPress={onSubmit}
          >
            <Text style={styles.murmurButtonText}>Murmur</Text>
          </TouchableOpacity>
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=me" }}
            style={styles.avatar}
          />
          <TextInput
            multiline
            placeholder="What's happening?"
            placeholderTextColor="#536471"
            style={styles.input}
            value={content}
            onChangeText={setContent}
            maxLength={MAX_CHARS}
            autoFocus
          />
        </View>

        {/* Bottom Toolbar */}
        <View style={styles.toolbar}>
          <View style={styles.iconGroup}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="image-outline" size={22} color="#BB86FC" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="list-outline" size={22} color="#BB86FC" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="location-outline" size={22} color="#BB86FC" />
            </TouchableOpacity>
          </View>

          <View style={styles.counterContainer}>
            <Text
              style={[
                styles.counterText,
                content.length >= MAX_CHARS && { color: "#ff4444" },
              ]}
            >
              {content.length}/{MAX_CHARS}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  closeButton: {
    padding: 5,
  },
  murmurButton: {
    backgroundColor: "#BB86FC",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  murmurButtonText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    flex: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    textAlignVertical: "top",
    paddingTop: 8,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  iconGroup: {
    flexDirection: "row",
    gap: 20,
  },
  iconButton: {
    padding: 5,
  },
  counterContainer: {
    justifyContent: "center",
  },
  counterText: {
    color: "#a1a1a1",
    fontSize: 12,
  },
});
