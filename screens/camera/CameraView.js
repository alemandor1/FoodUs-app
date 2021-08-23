import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Feather as Icon } from "@expo/vector-icons";
import firebase from "firebase";
import "firebase/firebase-firestore";
import { FAB } from "react-native-paper";
import { fileToBlob } from "../../utils/helpers";
import { getCurrentUser } from "../../utils/actions";

export default function CameraView({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

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
        <FAB
          style={styles.fab}
          large
          icon="undo"
          onPress={() => navigation.goBack()}
        ></FAB>
      </View>
    );
  }

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

  const uploadFlask = async (img) => {
    /* const response = await uploadImage(img, "foodImages", user.uid);
    if (response.statusResponse) {
      navigation.navigate("FoodList");
    } else {
      Alert.alert("An error occurred while uploading the picture.");
    } */

    let filename = img.split("/").pop();
    console.log(filename);

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(type);

    let form_data = new FormData();
    form_data.append("photo", { uri: img, name: filename, type });

    return await fetch("http://localhost:5000/detections", {
      body: form_data,
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginHorizontal: 20,
        }}
      >
        <Icon
          name="refresh-ccw"
          size={50}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        ></Icon>
        <Icon name="image" size={50} onPress={() => pickImage()} />
        <Icon name="aperture" size={65} onPress={() => takePicture()} />
        <Icon
          name="check"
          color="green"
          size={50}
          onPress={() => uploadFlask(image)}
        />
        <Icon
          name="x"
          color="red"
          size={50}
          onPress={() => navigation.goBack()}
        />
      </View>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  /* fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    marginBottom: 60,
    bottom: 0,
  }, */
});
