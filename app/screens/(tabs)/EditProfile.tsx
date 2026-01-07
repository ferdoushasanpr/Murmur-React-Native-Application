import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useAuth();

  const handleSubmit = () => {
    const payload = {
      name,
      bio,
      ...(password.trim() && { password }),
    };

    axios
      .put("http://10.0.2.2:3000/users/me", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    axios
      .delete("http://10.0.2.2:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Successfully Account Deleted.");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("http://10.0.2.2:3000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setName(response.data.name);
        setBio(response.data.bio);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Photos Section */}
        <View style={styles.photosContainer}>
          <TouchableOpacity style={styles.coverPhotoEdit} activeOpacity={0.7}>
            <View style={styles.photoOverlay}>
              <Ionicons name="camera-outline" size={30} color="#fff" />
            </View>
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=me" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.avatarOverlay} activeOpacity={0.7}>
              <Ionicons name="camera-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#71767b"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
              placeholderTextColor="#71767b"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7a7a7a"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  photosContainer: {
    height: 180,
    marginBottom: 40,
  },
  coverPhotoEdit: {
    height: 120,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  photoOverlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
    borderRadius: 30,
  },
  avatarContainer: {
    position: "absolute",
    bottom: -30,
    left: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#121212",
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    color: "#71767b",
    fontSize: 13,
    marginBottom: 2,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 5,
  },
  bioInput: {
    height: 80,
    textAlignVertical: "top",
  },
  deleteButton: {
    backgroundColor: "#e02d2dff",
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});
