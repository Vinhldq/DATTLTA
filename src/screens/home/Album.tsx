import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import HIEUTHUHAI from "./albums/HIEUTHUHAI";
import RapViet from "./albums/RapViet";
import Pop from "./albums/Pop";
import Riot from "./albums/Riot";

function AlbumScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", marginBottom: 20, fontSize: 30 }}>
        Albums
      </Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
      >
        <HIEUTHUHAI/>
        <RapViet/>
        <Pop/>
        <Riot/>
      </ScrollView>
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

export default AlbumScreen;
