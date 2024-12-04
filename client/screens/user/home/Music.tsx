import {
  Alert,
  FlatList,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import TrackListItem from "@/components/TrackListItem";
import { useEffect, useState } from "react";
import { fetchAllTracks } from "@/api/Api";
import { Track } from "@/types";

export default function Music() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Trạng thái kéo để làm mới

  // Hàm lấy ngẫu nhiên 30 bài hát từ danh sách
  const getRandomTracks = (tracks: Track[], limit: number): Track[] => {
    for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]]; // Hoán đổi vị trí ngẫu nhiên
    }
    return tracks.slice(0, limit); // Lấy 30 bài hát đầu tiên
  };

  const loadTracks = async () => {
    try {
      const data = await fetchAllTracks();
      const randomTracks = getRandomTracks(data, 30); // Lấy ngẫu nhiên 30 bài hát
      setTracks(randomTracks);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch items. Please try again later.");
    }
  };

  // Hàm làm mới khi kéo xuống
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTracks(); // Gọi lại API và cập nhật danh sách
    setRefreshing(false);
  };

  useEffect(() => {
    loadTracks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
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
  }
});
