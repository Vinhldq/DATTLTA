import {
  FlatList,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import TrackListItem from "@/src/components/TrackListItem";
import { useEffect, useState } from "react";
import { Track } from "@/src/types";
import firestore from "@react-native-firebase/firestore";

export default function Music() {
  const [data, setData] = useState<Track[]>([]); // Dữ liệu từ Firestore
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [refreshing, setRefreshing] = useState(false); // Trạng thái kéo để làm mới

  // Hàm lấy ngẫu nhiên 30 bài hát từ danh sách
  const getRandomTracks = (data: Track[], limit: number): Track[] => {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]]; // Hoán đổi vị trí ngẫu nhiên
    }
    return data.slice(0, limit); // Lấy 30 bài hát đầu tiên
  };

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
        const randomTracks = getRandomTracks(dataList, 30); // Lấy ngẫu nhiên 30 bài hát
        setData(randomTracks);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm làm mới khi kéo xuống
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(); // Gọi lại API và cập nhật danh sách
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <TrackListItem track={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id} // Đảm bảo key duy nhất
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        } // Thêm pull-to-refresh
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
});
