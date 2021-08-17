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

import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firebase-firestore";
import { getCurrentUser } from "../../utils/actions";
import Axios from "axios";
import Loading from "../../components/Loading";
import { FAB } from "react-native-paper";

export default class SuggestedRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnabled: this.props.route.params.isEnabled,
      recipes: [],
      predictions: [],
      loading: false,
      APIkey: "6812c1d4a76d4a6dbe7b8ef99427f05d", //6812c1d4a76d4a6dbe7b8ef99427f05d o 61f5abd161c842db98a65aa187831f41
    };
  }

  //Obtenemos los ingredientes que tengan el valor checked == true
  async getTrueIngredients() {
    const db = firebase.firestore(firebaseApp);
    const ingredientsTrue = [];

    const response = await db
      .collection("foodList")
      .where("idUser", "==", getCurrentUser().uid)
      .where("checked", "==", true)
      .get();
    response.forEach((doc) => {
      const foodData = doc.data();
      ingredientsTrue.push(foodData.name);
    });

    return ingredientsTrue;
  }

  getURLParse(ingredients) {
    var urlIngredients = ingredients.join(",+");
    return urlIngredients;
  }

  async getRecipes(url) {
    this.setState({ loading: true });
    const res = await Axios.get(url).then((result) => {
      return result.data;
    });
    return res;
  }

  async getPredictions() {
    const res = await Axios.post('http://localhost:5000/detections').then((result) => {
      return result.data;
    });
    return res;
  }

  async componentDidMount() {
    const ingredients = await this.getTrueIngredients();
    const stringIngredients = this.getURLParse(ingredients);
    if (this.state.isEnabled == true) {
      const res = await this.getRecipes(
        "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
          stringIngredients +
          "&ignorePantry&number=20&apiKey=" +
          this.state.APIkey
      );
      this.setState({
        recipes: res,
        loading: false,
      });
    } else {
      const res = await this.getRecipes(
        "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
          stringIngredients +
          "&number=20&apiKey=" +
          this.state.APIkey
      );
      this.setState({
        recipes: res,
        loading: false,
      });
    }
    const pred = await this.getPredictions();
    this.setState({
      predictions: pred.response.detections
    })
    console.log(pred.response)
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading == true ? (
          <Loading isVisible={this.state.loading} text="Loading recipes..." />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ padding: SIZES.padding * 3 }}>
              <View
                style={{
                  backgroundColor: "midnightblue",
                  borderBottomRightRadius: SIZES.radius,
                  borderBottomLeftRadius: SIZES.radius,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h1,
                    marginTop: 10,
                    marginBottom: 15,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Suggested Recipe
                </Text>
              </View>
            </View>
            <View>
              <FlatList
                data={this.state.recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      style={{ marginBottom: 5 }}
                      onPress={() =>
                        navigation.navigate("Recipe", { id: item.id })
                      }
                    >
                      <View
                        style={{
                          marginBottom: SIZES.padding,
                        }}
                      >
                        <Image
                          source={
                            item?.image == null
                              ? require("../../assets/backgroundlogo.png")
                              : { uri: item.image }
                          }
                          resizeMode="cover"
                          style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius,
                          }}
                        />
                      </View>
                      <Text style={{ ...FONTS.body2 }}>{item.title}</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginBottom: SIZES.padding * 4 }}>
                      <Text style={{ ...FONTS.body4, fontWeight: "bold" }}>
                        Missed ingredients:
                      </Text>
                      <View style={{ flex: 1 }}>
                        <FlatList
                          data={item.missedIngredients}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                backgroundColor: "orangered",
                                borderColor: "red",
                                margin: 3,
                                padding: 3,
                              }}
                            >
                              <Text
                                style={{
                                  ...FONTS.body5,
                                  color: "white",
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                }}
                              >
                                {item.name}
                              </Text>
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  </View>
                )}
                contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 30,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        )}

        <FAB
          style={styles.fab}
          large
          icon="undo"
          onPress={() => navigation.goBack()}
        ></FAB>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    marginBottom: 60 ,
    bottom:0
  },
});
