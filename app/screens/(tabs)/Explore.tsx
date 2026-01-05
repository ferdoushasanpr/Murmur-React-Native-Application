import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  // Add other fields from your API response
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await axios.get(
        `http://10.0.2.2:3000/users/email/${searchQuery.trim()}`
      );
      setResult(response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#71767b"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search User by Email"
            placeholderTextColor="#71767b"
            style={styles.input}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#71767b" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Area */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator color="#BB86FC" size="large" />
        </View>
      ) : result ? (
        <View style={styles.resultCard}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={40} color="#71767b" />
          </View>

          {/* User Info */}
          <View style={styles.userBody}>
            <Text style={styles.userName}>{result.name}</Text>
            <Text style={styles.userEmail}>{result.email}</Text>

            <TouchableOpacity style={styles.profileButton} onPress={() => {}}>
              <Text style={styles.profileButtonText}>Visit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.centerContainer}>
          <Ionicons
            name={hasSearched ? "search-outline" : "planet-outline"}
            size={80}
            color="#222"
          />
          <Text style={styles.discoveryText}>
            {hasSearched
              ? `No murmurs found for "${searchQuery}"`
              : "Search for users to see their murmurs"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, color: "#fff", fontSize: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  discoveryText: {
    color: "#71767b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
  },
  listPadding: { paddingVertical: 10 },
  resultCard: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  murmurBody: { flex: 1 },
  murmurContent: { color: "#fff", fontSize: 15, lineHeight: 20 },
  murmurDate: { color: "#71767b", fontSize: 12, marginTop: 4 },
  avatarContainer: {
    marginRight: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },

  userBody: {
    flex: 1,
  },

  userName: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },

  userEmail: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },

  profileButton: {
    alignSelf: "flex-start",
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  profileButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
