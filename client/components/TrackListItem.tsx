import {
    Text,
    View,
    StyleSheet,
    Image,
    Pressable,
    Alert,
    ScrollView,
  } from "react-native";
  import { Track } from "../types";
  import { usePlayerContext } from "../providers/PlayerProvider";
  import { fetchAllTracks } from "../api/Api";
  import { useEffect, useState } from "react";
  
  type TrackListItemProps = {
    track: Track;
  };
  
  const TrackListItem = ({ track }: TrackListItemProps) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const { setTrack } = usePlayerContext();
  
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
      <ScrollView>
        {tracks.map((track) => (
          <Pressable
            key={track.id}
            onPress={() => setTrack(track)}
            style={styles.container}
          >
            <Image source={{ uri: track.image }} style={styles.image} />
            <View>
              <Text style={styles.title}>{track.name}</Text>
              <Text style={styles.subtitle}>{track.artists}</Text>
            </View>
          </Pressable>
        ))}
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