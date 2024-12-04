import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, Image } from "react-native";
import { Track } from "@/types";
import { fetchAllTracks } from "@/api/Api";
import TrackListItem from "@/components/TrackListItem";

function Riot() {
  const [tracks, setTracks] = useState<Track[]>([]); // Lưu kết quả tìm kiếm
  const [filteredSongs, setFilteredSongs] = useState<Track[]>([]); // Dữ liệu sau filter
  const AlbumName = "Riot";

  const loadTracks = async () => {
    try {
      const data = await fetchAllTracks();
      setTracks(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch items. Please try again later.");
    }
  };

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    const newData = tracks.filter(
      // API chuỗi
      // (item) =>
      //   item.musician &&
      //   item.musician.toLowerCase().includes(AlbumName.toLowerCase())

      // API mảng
      (item) =>
        item.musician &&
        Array.isArray(item.musician) &&
        item.musician.some((musician) =>
          musician.toLowerCase().includes(AlbumName.toLowerCase())
        )
    );

    setFilteredSongs(newData);
  }, [tracks]);

  return (
    <FlatList
      data={filteredSongs} // Sử dụng data từ state tracks
      keyExtractor={(item) => item.id} // Dùng id bài hát làm key
      renderItem={({ item }) => (
        <View style={styles.list}>
          <TrackListItem track={item} />
        </View>
      )} // Hiển thị mỗi item
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          <Image source={require("./images/riot.png")} style={styles.img} />
          <Text style={styles.title}>RIOT GAMES SONGS</Text>
          <Text style={styles.subtitle}>Riot Songs</Text>
        </View>
      }
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 0,
    margin: 0,
    // alignItems: "center",
  },
  img: {
    height: 200,
    width: 200,
    marginTop: 40,
    textAlign: "center",
    left: "50%",
    marginLeft: -100,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 5,
  },
  title: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  list: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Riot;
