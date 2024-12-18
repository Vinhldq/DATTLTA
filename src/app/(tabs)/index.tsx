import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import All from "@/src/screens/home/All";
import Music from "@/src/screens/home/Music";
import Album from "@/src/screens/home/Album";
import { enableScreens } from "react-native-screens";
import PlayerProvider from "@/src/providers/PlayerProvider";

// enableScreens(); // Kích hoạt react-native-screens

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarStyle: {
            backgroundColor: "black",
            height: 50,
            marginRight: 70,
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarItemStyle: {
            borderRadius: 30,
            marginHorizontal: 10,
            backgroundColor: "#686D76",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "none",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="All" component={All} />
        <Tab.Screen name="Music" component={Music} />
        <Tab.Screen name="Album" component={Album} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    margin: 0,
  },
});
