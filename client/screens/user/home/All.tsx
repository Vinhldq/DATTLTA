import { Alert, View, StyleSheet, Text } from "react-native";
import Music from "./Music";
import Album from "./Album";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";

export default function All() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Album />
        <Music />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({});
