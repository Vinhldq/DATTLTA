import { Alert, FlatList, View, StyleSheet } from "react-native";
import TrackListItem from "@/components/TrackListItem";
import { useEffect, useState } from "react";
import { fetchAllTracks } from "@/api/Api";
import { Track } from "@/types";

export default function HomeScreen() {
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
      <View style={styles.container}>
        <FlatList
        data={tracks}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchAllTracks}
        onEndReachedThreshold={1}
        style = {{backgroundColor: "black"}}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
});