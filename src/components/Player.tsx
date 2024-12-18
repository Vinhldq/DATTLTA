import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { usePlayerContext } from "../providers/PlayerProvider";
import { AudioPlayer } from "../hooks/AudioPlayer";
import { useEffect, useRef, useState } from "react";

const Player = () => {
  const colorValue = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const [add, setAdd] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Trạng thái để lưu số lượt like
  const track = usePlayerContext().track;
  const [visible, setVisible] = useState(false);

  const toggleAdd = () => {
    setAdd(!add);
  };

  const toggleLike = async () => {
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1;

    setLiked(!liked);
    setLikeCount(newLikeCount);
  };

  // Reset và chạy lại animation màu khi mở Modal
  useEffect(() => {
    if (visible) {
      colorValue.setValue(0); // Reset value
      Animated.loop(
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [visible]);

  // Reset và chạy lại animation xoay khi mở Modal
  useEffect(() => {
    if (visible) {
      spinValue.setValue(0); // Reset value
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [visible]);

  // Interpolate color animation
  const backgroundColor = colorValue.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: ["#DC143C", "#FFA07A", "#FFC0CB", "#FF573380", "#DC143C"],
  });

  // Interpolate spin animation
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const {
    isPlaying,
    isLooping,
    duration,
    position,
    onPlayPause,
    toggleLooping,
    formatTime,
    playNextTrack,
    playPreviousTrack,
  } = AudioPlayer(track);

  // Return null if no track is selected
  if (!track) {
    return null;
  }

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <View style={styles.container}>
          <View style={styles.player}>
            <Image source={{ uri: track.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>
                {track.name}
              </Text>
              {/* <Text style={styles.subtitle} numberOfLines={1}>{track.artists.join(", ")}</Text> */}
              <Text style={styles.subtitle} numberOfLines={1}>
                {track.artists}
              </Text>
            </View>

            <View>
              <View style={styles.icon}>
                {/* Button to toggle looping */}
                <TouchableOpacity
                  onPress={toggleLooping}
                  style={{ marginLeft: 10 }}
                >
                  <Ionicons
                    name={isLooping ? "repeat" : "repeat-outline"} // Icon changes based on looping state
                    size={20}
                    color={isLooping ? "gold" : "white"} // Color changes based on looping state
                  />
                </TouchableOpacity>

                <Ionicons
                  onPress={toggleAdd}
                  name={add ? "checkmark-circle" : "add-circle-outline"}
                  size={22}
                  color={add ? "#00FF9C" : "white"}
                  style={{ marginHorizontal: 10 }}
                />

                <Ionicons
                  onPress={onPlayPause}
                  disabled={!track.audio_file}
                  name={isPlaying ? "pause" : "play"}
                  size={22}
                  color={track?.audio_file ? "white" : "gray"}
                />
              </View>

              {/* Display Duration and Position */}
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {formatTime(position)} / {formatTime(duration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>

      <Modal transparent={true} visible={visible} animationType="slide">
        <Animated.View
          style={[
            styles.containerTrackScreen,
            { backgroundColor }, // Áp dụng màu sắc vào background
          ]}
        >
          <ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>x</Text>
            </Pressable>

            <View style={{ marginTop: 50 }}>
              <Animated.Image
                source={{ uri: track.image }}
                style={[styles.imageTrackScreen, { transform: [{ rotate }] }]}
              />

              <Pressable
                onPress={toggleLike}
                style={styles.iconContainerTrackScreen}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    paddingRight: 250,
                  }}
                >
                  <Text style={{ fontSize: 30, marginRight: 5 }}>
                    {likeCount}
                  </Text>
                  <AntDesign
                    name={liked ? "like1" : "like2"}
                    size={40}
                    color={liked ? "black" : "white"}
                  />
                </View>
              </Pressable>

              <View>
                <Text style={styles.titleTrackScreen}>{track.name}</Text>
                <Text style={styles.subtitleTrackScreen}>
                  Ca sĩ: {track.artists}
                </Text>
                <Text style={styles.subtitleTrackScreen}>
                  Nhà soạn nhạc: {track.musician}
                </Text>
                <Text style={styles.subtitleTrackScreen}>
                  Thể loại: {track.category}
                </Text>
                {/* <Text style={styles.subtitle}>Ca sĩ: {track.artists.join(", ")}</Text>
                    <Text style={styles.subtitle}>Nhà soạn nhạc: {track.musician.join(", ")}</Text>
                    <Text style={styles.subtitle}>Thể loại: {track.category.join("/")}</Text> */}
              </View>

              {/* Display Duration and Position */}
              <View style={styles.progressContainer}>
                <Text style={{ color: "white", fontSize: 30 }}>
                  {formatTime(position)} / {formatTime(duration)}
                </Text>
              </View>

              <View>
                <View style={styles.iconTrackScreen}>
                  {/* Button to toggle looping */}
                  <TouchableOpacity onPress={toggleLooping}>
                    <Ionicons
                      name={isLooping ? "repeat" : "repeat-outline"} // Icon changes based on looping state
                      size={50}
                      color={isLooping ? "gold" : "white"} // Color changes based on looping state
                    />
                  </TouchableOpacity>

                  <Ionicons
                    onPress={playPreviousTrack}
                    name={"play-skip-back"}
                    size={50}
                    color={"white"}
                    style={{ marginLeft: 30 }}
                  />

                  <Ionicons
                    onPress={onPlayPause}
                    disabled={!track.audio_file}
                    name={
                      isPlaying ? "pause-circle-sharp" : "play-circle-sharp"
                    }
                    size={50}
                    color={track?.audio_file ? "white" : "gray"}
                    style={{ marginLeft: 30, marginRight: 30 }}
                  />

                  <Ionicons
                    onPress={playNextTrack}
                    name={"play-skip-forward"}
                    size={50}
                    color={"white"}
                    style={{ marginRight: 30 }}
                  />

                  <Ionicons
                    onPress={toggleAdd}
                    name={add ? "checkmark-circle" : "add-circle-outline"}
                    size={50}
                    color={add ? "#00FF9C" : "white"}
                    style={{ marginHorizontal: 10 }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
  },
  container: {
    position: "absolute",
    // top: -75,
    bottom: 0,
    width: "100%",
    height: 80,
    padding: 10,
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
  progressContainer: {
    // marginTop: 30,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  progressText: {
    color: "white",
    fontSize: 14,
  },
  containerTrackScreen: {
    alignItems: "center",
    margin: 0,
    padding: 0,
    flex: 1,
  },
  imageTrackScreen: {
    height: 300,
    width: 300,
    borderRadius: 500,
    marginLeft: 50,
  },
  iconContainerTrackScreen: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleTrackScreen: {
    fontSize: 30,
    margin: 10,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleTrackScreen: {
    fontSize: 15,
    opacity: 0.5,
    textAlign: "center",
    marginBottom: 10,
  },
  iconTrackScreen: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  closeButton: {
    width: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "40%",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  closeText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
});

export default Player;
