import React, { useState, useEffect } from "react";
import { View, Image, Alert } from "react-native";
import firebase from "firebase";
import "firebase/firebase-firestore";

import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fileToBlob } from "../../utils/helpers";
import { getCurrentUser } from "../../utils/actions";

export default function Picture(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const uploadImage = async (image, path, name) => {
    const result = { statusResponse: false, error: null, url: null };
    const ref = firebase.storage().ref(path).child(name);
    const blob = await fileToBlob(image);

    try {
      await ref.put(blob);
      const url = await firebase
        .storage()
        .ref(`${path}/${name}`)
        .getDownloadURL();
      result.statusResponse = true;
      result.url = url;
    } catch (error) {
      result.error = error;
    }
    return result;
  };

  const uploadFlask = async (uri) => {
    /*  const image = uri.split("/");
    const length = image.length; */
    //console.log(image[length-1]);

    const response = await uploadImage(uri, "foodImages", user.uid);
    
    if (response.statusResponse) {
      navigation.navigate("FoodList");
    } else {
      Alert.alert("An error occurred while uploading the picture.");
    }
  };

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
          onPress={() => navigation.navigate("FoodList")}
        />
        <Icon
          name="check"
          color="green"
          size={50}
          onPress={() => uploadFlask(props.route.params.uri)}
        />
      </View>
    </View>
  );
}
