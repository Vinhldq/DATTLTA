import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Track } from "../types";
import { usePlayerContext } from "../providers/PlayerProvider";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({ track }: TrackListItemProps) => {
  const { setTrack } = usePlayerContext();

  const handleClick = (selectedTrack: any) => {
    console.log('Selected Track:', selectedTrack);
    setTrack(selectedTrack); // Spread the entire track object
  };

  return (
    <ScrollView>
      <Pressable
        key={track.id}
        onPress={() => handleClick(track)}
        style={styles.container}
      >
        <Image source={{ uri: track.image }} style={styles.image} />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {track.name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {track.artists}
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },

  subtitle: {
    color: "gray",
  },

  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default TrackListItem;
