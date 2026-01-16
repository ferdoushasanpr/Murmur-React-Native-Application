import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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

interface Murmur {
  id: string;
  content: string;
  createdAt: string;
  likeCount: number;
}

const UserProfile: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, "Profile">>();
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId, token } = useAuth();
  const profile = route.params;

  const navigation = useNavigation();

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

  const fetchUserProfileData = async () => {
    try {
      setLoading(true);
      const followStatus = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/follows/${profile.id}/is-following`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFollowing(followStatus.data.isFollowing);

      const userMurmur = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/murmurs/user/${profile.id}`
      );
      setMurmurs(userMurmur.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const MurmurItem: React.FC<{ murmur: Murmur }> = ({ murmur }) => {
    return (
      <View style={styles.murmurCard}>
        <Text style={styles.murmurContent}>{murmur.content}</Text>

        <View style={styles.murmurFooter}>
          <Text style={styles.murmurDate}>
            {new Date(murmur.createdAt).toLocaleDateString()}
          </Text>
          <View style={styles.likeRow}>
            <Ionicons name="heart-outline" size={14} color="#aaa" />
            <Text style={styles.likeCount}>{murmur.likeCount}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

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
      <View style={styles.murmurListContainer}>
        <Text style={styles.sectionTitle}>Murmurs</Text>

        <FlatList
          data={murmurs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MurmurItem murmur={item} />}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.emptyText}>No murmurs yet.</Text>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
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
  backButton: {
    position: "absolute",
    top: 24,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 20,
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
  murmurListContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },

  murmurCard: {
    backgroundColor: "#111",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#222",
  },

  murmurContent: {
    color: "#eee",
    fontSize: 14,
    lineHeight: 20,
  },

  murmurFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  murmurDate: {
    color: "#777",
    fontSize: 12,
  },

  likeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  likeCount: {
    color: "#aaa",
    fontSize: 12,
    marginLeft: 4,
  },

  emptyText: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
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
