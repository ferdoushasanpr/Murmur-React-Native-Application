import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [loading, setLoading] = useState(false);
  const { userId, token } = useAuth();
  const profile = route.params;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setLoading(true);
    axios
      .post(
        `${process.env.EXPO_PUBLIC_API_URL}/follows/${profile.id}/follow`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Follow/unfollow response:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching follow status:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.EXPO_PUBLIC_API_URL}/follows/${profile.id}/is-following`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsFollowing(response.data.isFollowing);
      })
      .catch((error) => {
        console.error("Error fetching follow status:", error);
      })
      .finally(() => {
        setLoading(false);
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
        <Text style={styles.bio}>
          {profile.bio.length > 0 ? profile.bio : "No bio available."}
        </Text>

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
        {profile.id !== userId && (
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
        )}
      </View>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#BB86FC" />
        </View>
      )}
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
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
