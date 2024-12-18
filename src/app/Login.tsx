import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ToastAndroid,
  } from "react-native";
  import React from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import Entypo from "@expo/vector-icons/Entypo";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import {
    GoogleSignin,
    statusCodes,
  } from "@react-native-google-signin/google-signin";
  import auth from "@react-native-firebase/auth";
  
  const LoginScreen = () => {
    // Cấu hình Google Sign-In
    GoogleSignin.configure({
      webClientId:
        "1044632252747-2hp0ka7ofe9giln2jl1s31nm7n3j9ikc.apps.googleusercontent.com",
    });
    
    async function onGoogleButtonPress() {
      try {
        // Kiểm tra Google Play Services
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
  
        // Đăng nhập Google và lấy userInfo
        const userInfo = await GoogleSignin.signIn();
  
        // Truy cập idToken từ data
        const idToken = userInfo?.data?.idToken;
  
        if (!idToken) {
          throw new Error("Không tìm thấy idToken trong phản hồi");
        }
  
        // Tạo thông tin xác thực cho Firebase
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
        // Đăng nhập vào Firebase
        await auth().signInWithCredential(googleCredential);
  
        console.log("Đăng nhập thành công:", userInfo.data?.user);
        ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.SHORT);
  
        // Chuyển sang màn hình Main
        // navigation.replace("Main");
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          ToastAndroid.show("Bạn đã hủy đăng nhập!", ToastAndroid.SHORT);
        } else if (error.code === statusCodes.IN_PROGRESS) {
          ToastAndroid.show("Đang xử lý, vui lòng chờ...", ToastAndroid.SHORT);
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          ToastAndroid.show(
            "Google Play Services không khả dụng!",
            ToastAndroid.SHORT
          );
        } else {
          console.error("Lỗi không xác định:", error);
          ToastAndroid.show("Đã xảy ra lỗi khi đăng nhập!", ToastAndroid.SHORT);
        }
      }
    }
  
    return (
      <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
        <SafeAreaView>
          <View style={{ height: 80 }} />
          <Entypo
            style={{ textAlign: "center" }}
            name="spotify"
            size={80}
            color="white"
          />
          <Text
            style={{
              color: "white",
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Millions of Songs Free on Spotify!
          </Text>
  
          <View style={{ height: 80, marginTop: 50 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#1BD954",
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <Text>Sign up Free</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                backgroundColor: "#131624",
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginVertical: 10,
                borderColor: "#C0C0C0",
                borderWidth: 0.8,
              }}
              onPress={onGoogleButtonPress}
            >
              <AntDesign name="google" size={24} color="red" />
              <Text
                style={{
                  fontWeight: "500",
                  color: "white",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                padding: 10,
                marginLeft: "auto",
                marginRight: "auto",
                width: 300,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  color: "white",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});
  