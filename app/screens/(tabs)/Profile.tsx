import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
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
              <Text style={styles.topNavTitle}>Current User</Text>
              <Text style={styles.topNavSubtitle}>0 Murmurs</Text>
            </View>
          </View>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=me" }}
            style={styles.miniAvatar}
          />
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
            <Text style={styles.displayName}>Current User</Text>
            <Text style={styles.handle}>@my_murmurs</Text>

            <Text style={styles.bio}>
              Software Architect building the future.
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={16} color="#a1a1a1" />
                <Text style={styles.metaText}>San Francisco, CA</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={16} color="#a1a1a1" />
                <Text style={styles.metaText}>Joined August 2023</Text>
              </View>
            </View>

            <View style={styles.followRow}>
              <TouchableOpacity style={styles.followItem}>
                <Text style={styles.followCount}>
                  5 <Text style={styles.followLabel}>Following</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.followItem}>
                <Text style={styles.followCount}>
                  10 <Text style={styles.followLabel}>Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Inner Tab Navigation */}
        <View style={styles.tabContainer}>
          {["Murmurs", "Replies", "Media", "Likes"].map((tab, index) => (
            <TouchableOpacity key={tab} style={styles.tabItem}>
              <Text
                style={[styles.tabText, index === 0 && styles.activeTabText]}
              >
                {tab}
              </Text>
              {index === 0 && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Area */}
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No murmurs posted yet.</Text>
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
  tabItem: { flex: 1, alignItems: "center", paddingVertical: 15 },
  tabText: { color: "#a1a1a1", fontWeight: "bold", fontSize: 15 },
  activeTabText: { color: "#BB86FC" }, // Using your purple accent color
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    width: "50%",
    height: 3,
    backgroundColor: "#BB86FC",
    borderRadius: 2,
  },
  emptyStateContainer: { paddingVertical: 80, alignItems: "center" },
  emptyStateText: { color: "#a1a1a1", fontSize: 16, fontWeight: "500" },
});
