import { Ionicons } from "@expo/vector-icons";
import React, { JSX } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Murmur {
  id: string;
  user: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  avatar: string;
}

const DATA: Murmur[] = [
  {
    id: "1",
    user: "Sarah Jenkins",
    handle: "@sarahj",
    time: "4m",
    content:
      "This is murmur number 1. Exploring the new Murmur app interface! #Excited",
    likes: 13,
    comments: 8,
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "2",
    user: "Alex Rivera",
    handle: "@arivera",
    time: "1h",
    content:
      "This is murmur number 2. Exploring the new Murmur app interface! #Excited",
    likes: 26,
    comments: 8,
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
];

interface MurmurItemProps {
  item: Murmur;
}

const MurmurItem: React.FC<MurmurItemProps> = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.contentContainer}>
      <View style={styles.userHeader}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.handleText}>
          {item.handle} · {item.time}
        </Text>
      </View>
      <Text style={styles.contentText}>{item.content}</Text>

      <View style={styles.actions}>
        <ActionIcon name="heart-outline" count={item.likes} />
        <ActionIcon name="chatbubble-outline" count={item.comments} />
        <ActionIcon name="share-social-outline" />
      </View>
    </View>
  </View>
);

interface ActionIconProps {
  name: keyof typeof Ionicons.glyphMap;
  count?: number;
}

const ActionIcon: React.FC<ActionIconProps> = ({ name, count }) => (
  <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
    <Ionicons name={name} size={18} color="#a1a1a1" />
    {count !== undefined && <Text style={styles.actionText}>{count}</Text>}
  </TouchableOpacity>
);

interface NavIconProps {
  name: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
}

const NavIcon: React.FC<NavIconProps> = ({ name, label, active }) => (
  <TouchableOpacity style={styles.navItem}>
    <Ionicons
      name={active ? (name.replace("-outline", "") as any) : name}
      size={24}
      color={active ? "#BB86FC" : "#a1a1a1"}
    />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function Timeline(): JSX.Element {
  const renderItem: ListRenderItem<Murmur> = ({ item }) => (
    <MurmurItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Murmur</Text>
        </View>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=me" }}
          style={styles.profilePic}
        />
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.bottomNav}>
        <NavIcon name="home-outline" label="Home" active />
        <NavIcon name="search-outline" label="Explore" />
        <NavIcon name="add-circle-outline" label="Post" />
        <NavIcon name="person-outline" label="Profile" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    color: "#BB86FC",
    fontSize: 20,
    fontWeight: "bold",
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#333",
  },
  card: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#121212",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
  handleText: {
    color: "#a1a1a1",
    fontSize: 14,
  },
  contentText: {
    color: "#e0e0e0",
    fontSize: 15,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingRight: 40,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    color: "#a1a1a1",
    marginLeft: 5,
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#222",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#1e1e1e",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingBottom: Platform.OS === "ios" ? 25 : 10,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    color: "#a1a1a1",
    fontSize: 12,
    marginTop: 2,
  },
  navLabelActive: {
    color: "#BB86FC",
  },
});
