import { formatDate } from "@/app/utilities/date_format";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { JSX, useEffect, useState } from "react";
import {
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

const MurmurItem: React.FC<{ item: Murmur }> = ({ item }) => (
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
        <ActionIcon name="heart-outline" count={item.likeCount} />
        <ActionIcon name="chatbubble-outline" />
      </View>
    </View>
  </View>
);

const ActionIcon: React.FC<{
  name: keyof typeof Ionicons.glyphMap;
  count?: number;
}> = ({ name, count }) => (
  <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
    <Ionicons name={name} size={18} color="#a1a1a1" />
    {count !== undefined && <Text style={styles.actionText}>{count}</Text>}
  </TouchableOpacity>
);

export default function Timeline(): JSX.Element {
  const [murmurs, setMurmurs] = useState<Murmur[]>([]);
  const { token } = useAuth();
  const renderItem: ListRenderItem<Murmur> = ({ item }) => (
    <MurmurItem item={item} />
  );

  useEffect(() => {
    axios
      .get("http://10.0.2.2:3000/murmurs/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMurmurs(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching murmurs:", error);
      });
  }, [murmurs]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.appBar}>
        <Text style={styles.logoText}>Murmur</Text>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=me" }}
          style={styles.profilePic}
        />
      </View>

      <FlatList
        data={murmurs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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
});
