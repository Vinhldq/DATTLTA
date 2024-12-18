import {
  FlatList,
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import TrackListItem from "@/src/components/TrackListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Track } from "@/src/types";
import firestore from "@react-native-firebase/firestore";
// import { fetchAllTracks } from "@/src/api/Api";

export default function SearchScreen() {
  const [search, setSearch] = useState(""); // Lưu input từ người dùng
  const [data, setData] = useState<Track[]>([]); // Lưu kết quả tìm kiếm
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [filteredData, setFilteredData] = useState(data); // Dữ liệu sau khi lọc

  // Hàm fetch dữ liệu từ Firestore 
  const fetchData = async () => {
    try {
      console.log("Fetching data from Firestore...");
      const snapshot = await firestore().collection("clone").get();
      if (snapshot.empty) {
        console.log("No data found in Firestore.");
        setData([]); // Nếu không có dữ liệu, set mảng rỗng
      } else {
        const dataList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Track[];
        console.log("Fetched data:", dataList);
        setData(dataList);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm lọc dữ liệu
  const handleSearch = () => {
    if (search.trim() === "") {
      setFilteredData(data); // Nếu không nhập gì, hiển thị toàn bộ dữ liệu
      return;
    }
    const newData = data.filter(
      (item) =>
        (item.name.trim() && item.name.trim().toLowerCase().includes(search.trim().toLowerCase())) ||
        (item.artists &&
          item.artists.trim().toLowerCase().includes(search.trim().toLowerCase())) ||
        (item.category &&
          item.category.trim().toLowerCase().includes(search.trim().toLowerCase())) ||
        (item.musician &&
          item.musician.trim().toLowerCase().includes(search.trim().toLowerCase()))

      // (item) =>
      //   item.name.toLowerCase().includes(search.toLowerCase()) ||
      //   item.artists.some((artist) =>
      //     artist.toLowerCase().includes(search.toLowerCase())
      //   ) ||
      //   item.category.some((category) =>
      //     category.toLowerCase().includes(search.toLowerCase())
      //   ) ||
      //   item.musician.some((musician) =>
      //     musician.toLowerCase().includes(search.toLowerCase())
      //   )
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
