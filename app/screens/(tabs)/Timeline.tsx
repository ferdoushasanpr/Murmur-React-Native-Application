import { formatDate } from "@/app/utilities/date_format";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { JSX, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

interface Murmur {
  id: string;
  author: {
    name: string;
  };
  content: string;
  createdAt: string;
  likeCount: number;
}

const toggleLikeHandler = (id: string, token: string) => {
  axios
    .post(`${process.env.EXPO_PUBLIC_API_URL}/murmurs/${id}/like`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const MurmurItem: React.FC<{ item: Murmur; token: string }> = ({
  item,
  token,
}) => (
  <View style={styles.card}>
    <Image
      source={{ uri: "https://i.pravatar.cc/150?u=sarah" }}
      style={styles.avatar}
    />
    <View style={styles.contentContainer}>
      <View style={styles.userHeader}>
        <Text style={styles.userName}>{item.author.name}</Text>
        <Text style={styles.handleText}> · {formatDate(item.createdAt)}</Text>
      </View>
      <Text style={styles.contentText}>{item.content}</Text>
      <View style={styles.actions}>
        <ActionIcon
          name="heart-outline"
          count={item.likeCount}
          onPress={() => toggleLikeHandler(item.id, token)}
        />
        <ActionIcon name="chatbubble-outline" onPress={() => {}} />
      </View>
    </View>
  </View>
);

const ActionIcon: React.FC<{
  name: keyof typeof Ionicons.glyphMap;
  count?: number;
  onPress: () => void;
}> = ({ name, count, onPress }) => (
  <TouchableOpacity
    style={styles.actionButton}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Ionicons name={name} size={18} color="#a1a1a1" />
    {count !== undefined && <Text style={styles.actionText}>{count}</Text>}
  </TouchableOpacity>
);

export default function Timeline(): JSX.Element {
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const fetchMurmurs = () => {
    setLoading(true);
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/murmurs/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMurmurs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching murmurs:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchMurmurs();
    }, [])
  );

  useEffect(() => {
    if (!token) return;

    fetchMurmurs();
  }, [token]);

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Not authenticated</Text>
      </SafeAreaView>
    );
  }

  const renderItem: ListRenderItem<Murmur> = ({ item }) => (
    <MurmurItem item={item} token={token} />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.appBar}>
        <Text style={styles.logoText}>Murmur</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=me" }}
          style={styles.profilePic}
        />
      </View>

      {murmurs.length > 0 ? (
        <FlatList
          data={murmurs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="planet-outline" size={80} color="#222" />
          <Text style={styles.emptyText}>Follow Someone to Get Murmurs</Text>
        </View>
      )}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#BB86FC" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  logoText: { color: "#BB86FC", fontSize: 20, fontWeight: "bold" },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#333",
  },
  card: { flexDirection: "row", padding: 15, backgroundColor: "#121212" },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  contentContainer: { flex: 1 },
  userHeader: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  userName: { color: "#fff", fontWeight: "bold", fontSize: 16, marginRight: 5 },
  handleText: { color: "#a1a1a1", fontSize: 14 },
  contentText: { color: "#e0e0e0", fontSize: 15, lineHeight: 20 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 12,
    paddingRight: 40,
  },
  actionButton: { flexDirection: "row", alignItems: "center", width: "50%" },
  actionText: { color: "#a1a1a1", marginLeft: 5, fontSize: 14 },
  separator: { height: 1, backgroundColor: "#222" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#a1a1a1",
    fontSize: 16,
    textAlign: "center",
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
