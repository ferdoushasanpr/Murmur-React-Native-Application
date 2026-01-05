import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utilities/date_format";

interface UserData {
  name: string;
  email: string;
  bio: string;
  followedCount: number;
  followerCount: number;
}

interface Murmur {
  id: string;
  content: string;
  createdAt: string;
  likeCount: number;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const [activeTab, setActiveTab] = useState("Murmurs");
  const { userId, token, logout } = useAuth();

  const deleteMurmur = (murmurId: string) => {
    axios
      .delete(`http://10.0.2.2:3000/murmurs/me/${murmurId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setMurmurs(murmurs.filter((m) => m.id !== murmurId));
      })
      .catch((error) => {
        console.error("Error deleting murmur:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://10.0.2.2:3000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });

    axios
      .get(`http://10.0.2.2:3000/murmurs/user/${userId}`)
      .then((response) => {
        setMurmurs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [murmurs]);

  const renderMurmur = (murmur: Murmur) => (
    <View key={murmur.id} style={styles.murmurCard}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?u=me" }}
        style={styles.murmurAvatar}
      />
      <View style={styles.murmurContent}>
        <View style={styles.murmurHeader}>
          <Text style={styles.murmurAuthor}>{userData?.name}</Text>
          <Text style={styles.murmurHandle}>
            · {formatDate(murmur.createdAt)}
          </Text>
        </View>
        <Text style={styles.murmurText}>{murmur.content}</Text>
        <View style={styles.interactionBar}>
          <View>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={18} color="#71767b" />
              <Text style={{ marginLeft: 6, color: "#71767b" }}>
                {murmur.likeCount}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={18} color="#71767b" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => deleteMurmur(murmur.id)}
          >
            <Ionicons name="trash-outline" size={18} color="#71767b" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Header Bar */}
        <View style={styles.topNav}>
          <View style={styles.topNavLeft}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.topNavText}>
              <Text style={styles.topNavTitle}>
                {userData?.name || "Current User"}
              </Text>
              <Text style={styles.topNavSubtitle}>0 Murmurs</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              logout();
              router.replace("../Login");
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Cover Photo Area */}
        <View style={styles.coverPhoto} />

        {/* Profile Info Section */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=me" }}
              style={styles.mainAvatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.displayName}>
              {userData?.name || "Current User"}
            </Text>
            <Text style={styles.handle}>
              {userData?.email || "Current User"}
            </Text>

            <Text style={styles.bio}>
              {userData?.bio ||
                "This is a sample bio. Update your profile to add a personal touch!"}
            </Text>

            <View style={styles.followRow}>
              <TouchableOpacity style={styles.followItem}>
                <Text style={styles.followCount}>
                  {userData?.followedCount}{" "}
                  <Text style={styles.followLabel}>Following</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.followItem}>
                <Text style={styles.followCount}>
                  {userData?.followerCount}{" "}
                  <Text style={styles.followLabel}>Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 3. Tabs Section */}
        <View style={styles.tabBar}>
          {["Murmurs", "Replies", "Media", "Likes"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabItem,
                activeTab === tab && styles.activeTabBorder,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 4. Content Area */}
        <View style={styles.contentArea}>
          {murmurs.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="megaphone-outline" size={64} color="#333" />
              <Text style={styles.emptyStateTitle}>Capture the moment</Text>
              <Text style={styles.emptyStateText}>
                When you post Murmurs, they&apos;ll show up here.
              </Text>
            </View>
          ) : (
            murmurs.map(renderMurmur)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#121212",
  },
  topNavLeft: { flexDirection: "row", alignItems: "center", gap: 20 },
  topNavText: { flexDirection: "column" },
  topNavTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  topNavSubtitle: { fontSize: 12, color: "#a1a1a1" },
  miniAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  coverPhoto: { height: 120, backgroundColor: "#333" }, // Muted dark cover
  profileInfoContainer: { paddingHorizontal: 15, marginBottom: 15 },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: -40,
  },
  mainAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#121212",
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#536471",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: { fontWeight: "bold", color: "#fff", fontSize: 14 },
  userDetails: { marginTop: 10 },
  displayName: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  handle: { fontSize: 15, color: "#a1a1a1" },
  bio: { fontSize: 15, color: "#fff", marginTop: 12, lineHeight: 20 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12, gap: 15 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { color: "#a1a1a1", fontSize: 14 },
  followRow: { flexDirection: "row", gap: 20, marginTop: 12 },
  followItem: { paddingVertical: 5 },
  followCount: { fontWeight: "bold", color: "#fff", fontSize: 14 },
  followLabel: { fontWeight: "normal", color: "#a1a1a1" },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginTop: 10,
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: 3,
    backgroundColor: "#BB86FC",
    borderRadius: 2,
  },
  murmurItem: {
    marginBottom: 15,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#121212",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  activeTabBorder: {
    borderBottomWidth: 3,
    borderBottomColor: "#BB86FC",
  },
  tabText: { color: "#71767b", fontWeight: "600", fontSize: 15 },
  activeTabText: { color: "#fff" },

  contentArea: { flex: 1 },
  murmurCard: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  murmurAvatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  murmurContent: { flex: 1 },
  murmurHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  murmurAuthor: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  murmurHandle: { color: "#71767b", marginLeft: 5 },
  murmurText: { color: "#fff", fontSize: 15, lineHeight: 20 },
  interactionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingRight: 40,
  },
  iconButton: { flexDirection: "row", alignItems: "center" },

  emptyStateContainer: {
    paddingTop: 60,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  emptyStateTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptyStateText: {
    color: "#71767b",
    textAlign: "center",
    marginTop: 8,
    fontSize: 15,
  },
});
