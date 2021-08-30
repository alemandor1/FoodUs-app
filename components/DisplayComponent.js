import React from "react";
import { View, Text } from "react-native";

function DisplayComponent(props) {
  const h = () => {
    if (props.horas === 0) {
      return <Text></Text>;
    } else {
      return (
        <View
          style={{
            backgroundColor: "#00ABA9",
            display: "flex",
            padding: 20,
            borderRadius: 5,
            width: 70,
            margin: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white"
          }}>
            {props.horas >= 10 ? props.horas : "0" + props.horas}
          </Text>
        </View>
      );
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center"
      }}
    >
      {h()}
      <View
        style={{
          backgroundColor: "#00ABA9",
          display: "flex",
          padding: 20,
          borderRadius: 5,
          width: 70,
          margin: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "white"
          }}>
          {props.minutos >= 10 ? props.minutos : "0" + props.minutos}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#00ABA9",
          display: "flex",
          padding: 20,
          borderRadius: 5,
          width: 70,
          margin: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "white"
          }}>
          {props.segundos >= 10 ? props.segundos : "0" + props.segundos}
        </Text>
      </View>
    </View>
  );
}

export default DisplayComponent;
