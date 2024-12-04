import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import Player from "@/components/Player";
import Entypo from "@expo/vector-icons/Entypo";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationIndependentTree,
  useNavigation,
} from "@react-navigation/native";
import LoginScreen from "../login";
import PlayerTrackScreen from "@/components/PlayerTrackScreen";

type RootStackParamList = {
  Main: undefined;
  Admin: undefined;
  PlayerTrackScreen: undefined;
  // Add other screens if needed
};

type AlbumScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<AlbumScreenNavigationProp>();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: "#090909",
        },
      }}
      tabBar={(props) => (
        <Pressable onPress={() => navigation.navigate("PlayerTrackScreen")}>
          <View>
            <Player />
            <BottomTabBar {...props} />
          </View>
        </Pressable>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Entypo
                    name="log-out"
                    size={25}
                    color={"white"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: "#090909",
          },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#090909",
          },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Tabs.Screen
        name="Library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" size={24} color={color} />
          ),
          headerStyle: {
            backgroundColor: "#090909",
          },
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> */}
            <Stack.Screen
              name="Main"
              component={TabLayout}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="PlayerTrackScreen"
              component={PlayerTrackScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default Navigation;
