import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import Loading from "../../components/Loading";
import { FAB } from "react-native-paper";
import { FONTS, SIZES } from "../../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firebase-firestore";
import { getCurrentUser, addDocumentWithoutId } from "../../utils/actions";
import { map } from "lodash";
import { Alert } from "react-native";

export default class Detections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      food: this.props.route.params.food,
      loading: false,
      myFoodListNames: [],
      myFoodList: [],
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    this.removeElements();
    const response = await this.getMyIngredients();
    this.setState({
      myFoodListNames: response.myIngredientsName,
      myFoodList: response.myIngredients,
      loading: false,
    });
  }

  async getMyIngredients() {
    const db = firebase.firestore(firebaseApp);
    const result = {
      statusResponse: true,
      error: null,
      myIngredients: [],
      myIngredientsName: [],
    };
    try {
      const response = await db
        .collection("foodList")
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      response.forEach((doc) => {
        const foodData = doc.data();
        result.myIngredients.push(foodData);
        const names = foodData.name;
        result.myIngredientsName.push(names);
      });
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    return result;
  }

  removeElements() {
    const finalFood = [];
    this.state.food.forEach((obj) => {
      if (!finalFood.some((o) => o.class === obj.class)) {
        finalFood.push({ ...obj });
      }
    });

    this.setState({ food: finalFood });
  }

  async addToFoodList() {
    const db = firebase.firestore(firebaseApp);
    const finalFood = [];
    this.state.food.forEach((obj) => {
      if (obj.class === "potato") {
        obj.class = "potatoes";
      } else if (obj.class === "carrot") {
        obj.class = "carrots";
      }
      finalFood.push({ ...obj });
    });

    for (i = 0; i < finalFood.length; i++) {
      if (!this.validateData(finalFood[i].class)) {
        Alert.alert("Alert Message", finalFood[i].class + " already added.", [
          { text: "OK" },
        ]);
      } else {
        this.setState({
          loading: true,
        });
        const docIdColum = await this.findFoodId(finalFood[i].class);

        const response = await db
          .collection("ingredients")
          .doc(docIdColum[0])
          .get();
        const nameMyIngredient = response.data();

        const addIngredient = await addDocumentWithoutId("foodList", {
          idUser: getCurrentUser().uid,
          idIngredient: docIdColum[0],
          checked: false,
          name: nameMyIngredient.name,
        });

        if (addIngredient.statusResponse) {
          const response2 = await this.getMyIngredients();
          this.setState({
            myFoodListNames: response2.myIngredientsName,
            myFoodList: response2.myIngredients,
          });
        }
        this.setState({
          loading: false,
        });
      }
    }

    this.props.navigation.navigate("Main");
  }

  validateData(name) {
    let isValid = true;

    if (this.state.myFoodListNames.includes(name)) {
      isValid = false;
    }
    return isValid;
  }

  async findFoodId(name) {
    const db = firebase.firestore(firebaseApp);
    const result = [];
    const ingDoc = await db
      .collection("ingredients")
      .where("name", "==", name)
      .get();
    await Promise.all(
      map(ingDoc.docs, async (doc) => {
        result.push(doc.id);
      })
    );
    return result;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading == true ? (
          <Loading
            isVisible={this.state.loading}
            text="Loading ingredients..."
          />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ padding: SIZES.padding * 3 }}>
              <View
                style={{
                  backgroundColor: "mediumvioletred",
                  borderBottomRightRadius: SIZES.radius,
                  borderBottomLeftRadius: SIZES.radius,
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
                  Ingredients recognised
                </Text>
              </View>
            </View>
            {this.state.food.length != 0 ? (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    paddingBottom: 280,
                    paddingTop: 15,
                  }}
                >
                  <ScrollView
                    style={{
                      height: "80%",
                    }}
                  >
                    <FlatList
                      data={this.state.food}
                      keyExtractor={(item) => item.id}
                      contentContainerStyle={{
                        padding: 20,
                        height: "100%",
                      }}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            flexDirection: "row",
                            padding: 20,
                            marginBottom: 20,
                            backgroundColor: "#FDEDEC",
                            borderRadius: 12,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              ...FONTS.h3,
                              color: "black",
                              paddingLeft: 25,
                              paddingRight: 5,
                            }}
                          >
                            {item.class}
                          </Text>
                        </View>
                      )}
                    />
                  </ScrollView>
                </View>
                <View
                  style={{
                    backgroundColor: "lavender",
                    flex: 1,
                    elevation: 10,
                    borderBottomRightRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                    bottom: 230,
                    paddingTop: 10,
                    paddingBottom: 50,
                    width: 300,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      lineHeight: 22,
                      textAlign: "center",
                      color: "darkslateblue",
                    }}
                  >
                    Do you want to add these ingredients?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <FAB
                    style={styles.fab1}
                    large
                    icon="check"
                    onPress={() => this.addToFoodList()}
                  ></FAB>
                  <FAB
                    style={styles.fab2}
                    large
                    icon="close"
                    onPress={() => navigation.goBack()}
                  ></FAB>
                </View>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    padding: 20,
                    marginBottom: 20,
                    marginTop: 50,
                    backgroundColor: "#FDEDEC",
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h2,
                      color: "black",
                      paddingLeft: 25,
                      paddingRight: 5,
                    }}
                  >
                    No ingredients detected.
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-end",
                  }}
                >
                  <FAB
                    style={{
                      position: "absolute",
                      marginBottom: 40,
                      bottom: 50,
                      alignSelf: "flex-end",
                      right: 30
                    }}
                    large
                    icon="undo"
                    onPress={() => navigation.goBack()}
                  ></FAB>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab1: {
    position: "absolute",
    margin: 16,
    left: 30,
    backgroundColor: "green",
    marginBottom: 40,
    bottom: 100,
  },
  fab2: {
    position: "absolute",
    margin: 16,
    right: 30,
    backgroundColor: "red",
    marginBottom: 40,
    bottom: 100,
  },
});
