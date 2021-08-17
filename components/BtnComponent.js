import React from "react";
import { Icon, Button } from "react-native-elements";
import { View, Text } from "react-native";

function BtnComponent(props) {
  return (
    <View>
      {props.status === 0 ? (
        <Button
          style={{
            backgroundColor: "#fff",
            marginTop: 30,
            marginLeft: 5,
            borderWidth: 0,
            padding: 12,
            width: 70,
            height: 70,
            borderRadius: 100,
            borderColor: "#eb2d2d",
            borderStyle: "solid"
          }}
          onPress={props.start}
        >
          <Icon type="material-community" name="record" color="#eb2d2d" />
        </Button>
      ) : (
        <Text></Text>
      )}

      {props.status === 1 ? (
        <View>
          <Button
            style={{
              backgroundColor: "#fff",
              marginTop: 30,
              marginLeft: 5,
              borderWidth: 0,
              padding: 12,
              width: 70,
              height: 70,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "#00ABA9",
              borderStyle: "solid"
            }}
            onPress={props.stop}
          >
            <Icon type="material-community" name="pause" color="#00ABA9" />
          </Button>
          <Button
             style={{
              backgroundColor: "#fff",
              marginTop: 30,
              marginLeft: 5,
              borderWidth: 0,
              padding: 12,
              width: 70,
              height: 70,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "#FFC900",
              borderStyle: "solid"
            }}
            onPress={props.reset}
          >
            <Icon
              type="material-community"
              name="step-backward"
              color="#FFC900"
            />
          </Button>
        </View>
      ) : (
        <Text></Text>
      )}

      {props.status === 2 ? (
        <View>
          <Button
            style={{
              backgroundColor: "#fff",
              marginTop: 30,
              marginLeft: 5,
              borderWidth: 0,
              padding: 12,
              width: 70,
              height: 70,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "#4f44eb",
              borderStyle: "solid"
            }}
            onPress={props.resume}
          >
            <Icon type="material-community" name="play" color="#4f44eb" />
          </Button>
          <Button
            style={{
              backgroundColor: "#fff",
              marginTop: 30,
              marginLeft: 5,
              borderWidth: 0,
              padding: 12,
              width: 70,
              height: 70,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "#FFC900",
              borderStyle: "solid"
            }}
            onPress={props.reset}
          >
            <Icon
              type="material-community"
              name="step-backward"
              color="#FFC900"
            />
          </Button>
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}

export default BtnComponent;