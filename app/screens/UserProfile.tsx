import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

type Profile = {
  id: string;
  name: string;
  email: string;
  bio: string;
  coverPhoto: string;
  profilePhoto: string;
  followers: number;
  following: number;
  isFollowing: boolean;
};

type RouteParams = {
  Profile: Profile;
};

const UserProfile: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, "Profile">>();
  const [isFollowing, setIsFollowing] = useState(false);
  const { token } = useAuth();
  const profile = route.params;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:3000/follows/${profile.id}/is-following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsFollowing(response.data.isFollowing);
      })
      .catch((error) => {
        console.error("Error fetching follow status:", error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cover Photo */}
      <Image source={{ uri: profile.coverPhoto }} style={styles.coverPhoto} />

      {/* Profile Photo */}
      <View style={styles.profileImageWrapper}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=me" }}
          style={styles.profileImage}
        />
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profile.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profile.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Follow Button */}
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={handleFollow}
        >
          <Text
            style={[
              styles.followButtonText,
              isFollowing && styles.followingButtonText,
            ]}
          >
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  coverPhoto: {
    width: "100%",
    height: 160,
  },
  profileImageWrapper: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#000",
  },
  infoContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  statBox: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "#aaa",
  },
  followButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 6,
    backgroundColor: "#7C3AED",
  },
  followingButton: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#555",
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  followingButtonText: {
    color: "#ccc",
  },
});
