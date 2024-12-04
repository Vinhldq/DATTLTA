import {
  FlatList,
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import TrackListItem from "@/components/TrackListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import { fetchAllTracks } from "@/api/Api";

export default function SearchScreen() {
  const [search, setSearch] = useState(""); // Lưu input từ người dùng
  const [tracks, setTracks] = useState<Track[]>([]); // Lưu kết quả tìm kiếm
  const [filteredData, setFilteredData] = useState(tracks); // Dữ liệu sau khi lọc

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

  // Hàm lọc dữ liệu
  const handleSearch = () => {
    if (search.trim() === "") {
      setFilteredData(tracks); // Nếu không nhập gì, hiển thị toàn bộ dữ liệu
      return;
    }
    const newData = tracks.filter(
      // API theo chuỗi
      // (item) =>
      //   (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
      //   (item.artists &&
      //     item.artists.toLowerCase().includes(search.toLowerCase())) ||
      //   (item.category &&
      //     item.category.toLowerCase().includes(search.toLowerCase())) ||
      //   (item.musician &&
      //     item.musician.toLowerCase().includes(search.toLowerCase()))

      // API theo mảng
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.artists.some((artist) =>
          artist.toLowerCase().includes(search.toLowerCase())
        ) ||
        item.category.some((category) =>
          category.toLowerCase().includes(search.toLowerCase())
        ) ||
        item.musician.some((musician) =>
          musician.toLowerCase().includes(search.toLowerCase())
        )
    );

    setFilteredData(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="search" size={18} color="white" />
        <TextInput
          style={styles.input}
          placeholder="What do you want to find?"
          value={search}
          onChangeText={(text) => setSearch(text)} // Cập nhật từ khóa tìm kiếm
          onSubmitEditing={handleSearch} // Kích hoạt tìm kiếm khi nhấn Enter
          returnKeyType="search"
          autoFocus={true}
          placeholderTextColor="gray"
        />
        <Text onPress={() => setSearch("")} style={{ color: "white" }}>
          Cancel
        </Text>
      </View>

      <FlatList
        data={filteredData} // Sử dụng data từ state tracks
        keyExtractor={(item) => item.id} // Dùng id bài hát làm key
        renderItem={({ item }) => <TrackListItem track={item} />} // Hiển thị mỗi item
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.noResult}>Không tìm thấy kết quả</Text>
        }
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
  loadingText: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  noResult: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 16,
    marginTop: 20,
  },
  loading: {
    marginTop: 20,
  },
});
