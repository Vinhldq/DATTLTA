import React, { useEffect, useState } from "react";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Pressable, View, ActivityIndicator, ToastAndroid } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import Player from "@/src/components/Player";
import Entypo from "@expo/vector-icons/Entypo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import LoginScreen from "../Login";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabLayout() {
  const colorScheme = useColorScheme();

  // Cấu hình Google Sign-In
  GoogleSignin.configure({
    webClientId:
      "980312292967-t4jirfvjq8j9mnf8lvulm4536qe6ag41.apps.googleusercontent.com",
  });

  const signOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      ToastAndroid.show("Đã đăng xuất!", ToastAndroid.SHORT);
      console.log("User signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: "#090909",
        },
      }}
      tabBar={(props) => (
        <View>
          <Player />
          <BottomTabBar {...props} />
        </View>
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
            <Pressable onPress={signOut}>
              <Entypo
                name="log-out"
                size={25}
                color={"white"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
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
          title: "Favorite",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={24} color={color} />
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

const Stack = createNativeStackNavigator();

function Navigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Cập nhật trạng thái người dùng
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Hủy lắng nghe khi component bị unmount
  }, []);

  // Hiển thị màn hình chờ trong lúc kiểm tra trạng thái đăng nhập
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
          {!user ? (
            // Nếu chưa đăng nhập, chuyển đến Login
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          ) : (
            // Nếu đã đăng nhập, chuyển đến Main
            <Stack.Screen
              name="Main"
              component={TabLayout}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default Navigation;
