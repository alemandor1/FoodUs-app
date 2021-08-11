import React from "react";
import {
  View
} from "react-native";

function DisplayComponent(props) {
  const h = () => {
    if (props.time.h === 0) {
      return "";
    } else {
      return (
        <View
          style={{
            backgroundColor: "#00ABA9",
            display: "flex",
            padding: 20,
            borderRadius: 5,
            width: 70,
          }}
        >
          {props.time.h >= 10 ? props.time.h : "0" + props.time.h}
        </View>
      );
    }
  };
  return (
    <View>
      {h()}&nbsp;&nbsp;
      <View
          style={{
            backgroundColor: "#00ABA9",
            display: "flex",
            padding: 20,
            borderRadius: 5,
            width: 70,
          }}
        >{props.time.m >= 10 ? props.time.m : "0" + props.time.m}</View>
      &nbsp;:&nbsp;
      <View
          style={{
            backgroundColor: "#00ABA9",
            display: "flex",
            padding: 20,
            borderRadius: 5,
            width: 70,
          }}
        >{props.time.s >= 10 ? props.time.s : "0" + props.time.s}</View>
    </View>
  );
}

export default DisplayComponent;
