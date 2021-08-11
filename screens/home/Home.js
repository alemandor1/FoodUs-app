import React from "react";
import { View, Image, StyleSheet, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "react-native-elements";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SIZES, FONTS, COLORS } from "../../constants";

export default function Home({navigation}) {
  const renderHeader = () => {
    return (
      <View style={{ height: SIZES.height > 700 ? "65%" : "60%" }}>
        <ImageBackground
          source={require("../../assets/picacebolla.jpeg")}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: "flex-end",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                width: "80%",
                color: COLORS.white,
                ...FONTS.largeTitle,
              }}
            >
              FoodUs
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  return (
    /*  <View style={styles.container}> */
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      {renderHeader()}

      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginTop: "2%",
            width: "70%",
            color: COLORS.lightGray,
            ...FONTS.body3,
          }}
        >
          Look what's in your fridge!
        </Text>

        <View
          style={{
            flex: 1,
            margin:40
          }}
        >
          <Button
            testID="buttonLogin"
            title="Sign In"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate("Login")}
          />

          <Button
            testID="buttonRegister"
            title="Sign Up"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>

      {/* <Image
                style={styles.logo}
                source={require("../../assets/logo.png")}
            />

             */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  cabecera: {
    width: "100%",
    height: "25%",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#C64755",
  },
});
