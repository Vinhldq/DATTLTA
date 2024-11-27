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



// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: "#090909",
        },
      }}
      tabBar={(props) => (
        <Link href="/modal" asChild>
          <Pressable>
              <View>
                <Player />
                <BottomTabBar {...props} />
              </View>
          </Pressable>
        </Link>
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
        name="Search"
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