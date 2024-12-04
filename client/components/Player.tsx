import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerContext } from "../providers/PlayerProvider";
import { AudioPlayer } from "../hooks/AudioPlayer";

const Player = () => {
  const track  = usePlayerContext().track;
  
  const { sound,
    isPlaying,
    isLooping,
    duration,
    position,
    onPlayPause,
    toggleLooping,
    formatTime, } = AudioPlayer(track)

  // Return null if no track is selected
  if (!track) {
    return null;
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.player}>
          <Image source={{ uri: track.image }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>{track.name}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{track.artists.join(", ")}</Text>
            {/* <Text style={styles.subtitle} numberOfLines={1}>{track.artists}</Text> */}
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
                name={"heart-outline"}
                size={20}
                color={"white"}
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
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
  },
  container: {
    position: "absolute",
    top: -75,
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
});

export default Player;
