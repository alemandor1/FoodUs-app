import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Picture(props) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {props.route.params.uri && (
        <Image source={{ uri: props.route.params.uri }} style={{ flex: 1 }} />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginHorizontal: 20,
        }}
      >
        <Icon
          name="x"
          color="red"
          size={50}
          onPress={() => navigation.goBack()}
        />
        <Icon
          name="check"
          color="green"
          size={50}
          onPress={() => uploadFlask()}
        />
      </View>
    </View>
  );
}
