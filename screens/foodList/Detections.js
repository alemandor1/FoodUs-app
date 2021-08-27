import React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { SIZES, FONTS } from "../../constants";
import Axios from "axios";
import Loading from "../../components/Loading";
import { Overlay } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";

export default class Detections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      food: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const preds = await this.getPredictions();
    console.log(preds)
    this.setState({
      food: preds.response[0].detections,
      loading: false,
    });
  }

  async getPredictions() {
    const res = await Axios.post("http://192.168.1.63:5000/detections").then(
      (result) => {
        return result.data;
      }
    );
    return res;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading == true ? (
          <Loading isVisible={this.state.loading} text="Loading ingredients..." />
        ) : (
          <View style={{ flex: 1 }}>
            <Overlay
              windowBackgoundColor="rgba(0,0,0,0.5)"
              overlayBackgroundColor="transparent"
              overlayStyle={styles.overlay}
            >
              <View style={styles.view}>
                <FlatList
                  data={this.state.food}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <Text>{item}</Text>}
                />

                <Button
                  title="OK"
                  containerStyle={styles.btnContainer}
                  buttonStyle={styles.btn}
                  onPress={() => navigation.navigate("FoodList")}
                />
              </View>
            </Overlay>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    width: "95%",
  },
  btn: {
    backgroundColor: "#442484",
  },
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#442484",
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
