import { FlatList, View, TextInput, Text, StyleSheet, Alert } from "react-native";
import TrackListItem from "@/components/TrackListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import { fetchAllTracks } from "@/api/Api";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await fetchAllTracks();
        setTracks(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch items. Please try again later.");
      }
    };

    loadTracks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="search" size={18} color="white" />
        {/* <TextInput
          value={search}
          placeholder="What do you want to listen to?"
          onChangeText={setSearchTerm}
          style={styles.input}
        /> */}
        <TextInput
                style={styles.input}
                placeholder="Nhập từ khóa tìm kiếm"
                value={search}
                onChangeText={(text) => setSearch(text)}
                autoFocus={true}  // Automatically focus when Search opens
            />
        <Text onPress={() => setSearch("")} style={{ color: "white" }}>
          Cancel
        </Text>
      </View>
      
      <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: -30,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#121314",
    borderRadius: 10,
  },
  input: {
    color: "white",
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 5,
  },
});