import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HIEUTHUHAI from "./albums/HIEUTHUHAI";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import RapViet from "./albums/RapViet";
import Pop from "./albums/Pop";
import Riot from "./albums/Riot";

type RootStackParamList = {
  Album: undefined;
  HIEUTHUHAI: undefined;
  RapViet: undefined;
  Pop: undefined;
  Riot: undefined;
  // Add other screens if needed
};

type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

function Album() {
  const navigation = useNavigation<AlbumScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", marginBottom: 20, fontSize: 30 }}>
        This is some albums
      </Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
      >
        <Pressable onPress={() => navigation.navigate("HIEUTHUHAI")}>
          <View style={styles.alb}>
            <Image
              source={require("./albums/images/HIEUTHUHAI.jpg")}
              style={styles.albImg}
            />
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              SONGS OF HIEUTHUHAI
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              HIEUTHUHAI
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("RapViet")}>
          <View style={styles.alb}>
            <Image
              source={require("./albums/images/Rap_Viet.png")}
              style={styles.albImg}
            />
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              RAPVIET
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Rap Việt
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Pop")}>
          <View style={styles.alb}>
            <Image
              source={require("./albums/images/nhac_pop_1.jpg")}
              style={styles.albImg}
            />
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              POP SONGS
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Pop Songs
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Riot")}>
          <View style={styles.alb}>
            <Image
              source={require("./albums/images/riot.png")}
              style={styles.albImg}
            />
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              RIOT GAMES SONGS
            </Text>
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Riot Songs
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AlbumScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name="Album"
          component={Album}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="HIEUTHUHAI"
          component={HIEUTHUHAI}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="RapViet"
          component={RapViet}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Pop"
          component={Pop}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Riot"
          component={Riot}
          options={{ headerShown: false }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  alb: {
    width: 150,
    marginRight: 30,
  },
  albImg: {
    height: 150,
    width: 150,
    borderRadius: 5,
    borderBottomColor: "#FFF4B7",
    borderBottomWidth: 5,
  },
  title: {
    color: "white",
    marginTop: 10,
    fontSize: 20,
  },
  subtitle: {
    color: "gray",
    marginTop: 10,
    fontSize: 17,
  },
});

export default AlbumScreen;
