import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import "firebase/firebase-firestore";
import { FAB } from "react-native-paper";
import { uploadImage } from "../../utils/actions";
import { getCurrentUser } from "../../utils/actions";
import Constants from "expo-constants";
import { IconButton } from "react-native-paper";
import { Feather as Icon } from "@expo/vector-icons";

export default function CameraView({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      setHasCameraPermission(true);

      setHasGalleryPermission(true);

      setUser(getCurrentUser());
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return (
      <View>
        <FAB
          style={styles.fab}
          large
          icon="undo"
          onPress={() => navigation.goBack()}
        ></FAB>
      </View>
    );
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          No access to camera
        </Text>
        <FAB large icon="undo" onPress={() => navigation.goBack()}></FAB>
      </View>
    );
  }

  const showIp = async () => {
    const { manifest } = Constants;
    const api =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift()
        : `api.example.com`;

    return api;
  };

  const uploadFlask = async (img) => {
    await uploadImage(img, "foodImages", user.uid);

    const ip = await showIp();

    var data = JSON.stringify({
      filename: user.uid,
    });

    const response = await fetch("http://" + ip + ":5000/detections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });

    const dataResponse = await response.json().then((data) => {
      return data;
    });

    const foodData = dataResponse.response[0].detections;

    if (response.status == 200) {
      navigation.navigate("Detections", { food: foodData });
    } else {
      Alert.alert("An error occurred while uploading the picture.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{flex: 1}}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={{flex: 1}}
          type={type}
          ratio={"1:1"}
        />

        <View
          style={{
            flexDirection: "row",
            height: 0,
            alignItems: "flex-end",
            marginHorizontal: 20
          }}
        >
          <IconButton
            icon="autorenew"
            color="white"
            size={40}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <IconButton
            icon="image"
            color="white"
            size={40}
            onPress={() => pickImage()}
          />
          <Icon
            name="aperture"
            color="black"
            size={65}
            onPress={() => takePicture()}
            style={styles.shadow}
          />
          <IconButton
            icon="check"
            color="green"
            size={40}
            onPress={() => uploadFlask(image)}
          />
          <IconButton
            icon="window-close"
            color="red"
            size={40}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    marginBottom: 25,
    textShadowColor: "lightgray",
    shadowOpacity: 2,
    textShadowRadius: 4,
    textShadowOffset: { width: 0.5, height: 0.5 }
  }
});
