import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  addDocumentWithoutId,
  getCurrentUser,
  deleteFavorite,
  getIsFavorite,
} from "../../utils/actions";
import { Icon, Button } from "react-native-elements";
import { SIZES, COLORS, FONTS } from "../../constants";
import Axios from "axios";
import DisplayComponent from "../../components/DisplayComponent";
import BtnComponent from "../../components/BtnComponent";
import { FAB } from "react-native-paper";
import Loading from "../../components/Loading";
import { ScrollView } from "react-native";

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: "",
      recipeNutrition: "",
      loading: false,
      recipeId: this.props.route.params.id,
      APIkey: "6812c1d4a76d4a6dbe7b8ef99427f05d", //6812c1d4a76d4a6dbe7b8ef99427f05d o 61f5abd161c842db98a65aa187831f41
      favourite: false,
      date: "",
      //time: { s: 0, m: 0, h: 0 },
      segundos: 0,
      minutos: 0,
      horas: 0,
      interv: "",
      status: 0,
      // Not started = 0
      // started = 1
      // stopped = 2
    };
  }

  async componentDidMount() {
    const nut = await this.getRecipe(
      `https://api.spoonacular.com/recipes/` +
        this.state.recipeId +
        `/nutritionWidget.json?&apiKey=` +
        this.state.APIkey
    );
    const rec = await this.getRecipe(
      "https://api.spoonacular.com/recipes/" +
        this.state.recipeId +
        "/information?apiKey=" +
        this.state.APIkey
    );
    const fav = await getIsFavorite(this.state.recipeId);
    if (fav) {
      this.setState({
        favourite: fav.favourite,
      });
    }
    this.setState({
      recipe: rec,
      recipeNutrition: nut,
      loading: false,
    });
  }

  start() {
    this.run();
    this.setState({
      status: 1,
      interv: setInterval(() => this.run(), 6000),
    });
  }

  run() {
    var updatedS = this.state.segundos,
      updatedM = this.state.minutos,
      updatedH = this.state.horas;

    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;

    this.setState({ segundos: updatedS, minutos: updatedM, horas: updatedH });
  }

  stop() {
    clearInterval(this.state.interv);
    this.setState({
      status: 2,
    });
  }

  reset() {
    clearInterval(this.state.interv);
    this.setState({
      segundos: 0,
      minutos: 0,
      horas: 0,
      status: 0,
    });
  }

  resume() {
    this.start();
  }

  async addFavourite() {
    if (this.state.recipe.image == null) {
      const response1 = await addDocumentWithoutId("favourites", {
        idUser: getCurrentUser().uid,
        idRecipe: this.state.recipeId,
        title: this.state.recipe.title,
        readyInMinutes: this.state.recipe.readyInMinutes,
      });
      if (response1.statusResponse) {
        this.setState({ favourite: true });
      }
    } else {
      const response2 = await addDocumentWithoutId("favourites", {
        idUser: getCurrentUser().uid,
        idRecipe: this.state.recipeId,
        title: this.state.recipe.title,
        image: this.state.recipe.image,
        readyInMinutes: this.state.recipe.readyInMinutes,
      });
      if (response2.statusResponse) {
        this.setState({ favourite: true });
      }
    }
  }

  async removeFavourite() {
    const response = await deleteFavorite(this.state.recipeId);

    if (response.statusResponse) {
      this.setState({ favourite: false });
    }
  }

  async addToHistory() {
    const { navigation } = this.props;
    const time = "";
    if (this.state.horas > 0) {
      time =
        this.state.horas + ":" + this.state.minutos + ":" + this.state.segundos;
    } else {
      time = this.state.minutos + ":" + this.state.segundos;
    }
    if (this.state.recipe.image == null) {
      const response1 = await addDocumentWithoutId("history", {
        idUser: getCurrentUser().uid,
        idRecipe: this.state.recipeId,
        title: this.state.recipe.title,
        readyInMinutes: this.state.recipe.readyInMinutes,
        timeSpent: time,
        date: new Date(Date.now()).toDateString(),
      });
      if (response1.statusResponse) {
        navigation.navigate("Main");
      }
    } else {
      const response2 = await addDocumentWithoutId("history", {
        idUser: getCurrentUser().uid,
        idRecipe: this.state.recipeId,
        title: this.state.recipe.title,
        image: this.state.recipe.image,
        readyInMinutes: this.state.recipe.readyInMinutes,
        timeSpent: time,
        date: new Date(Date.now()).toDateString(),
      });
      if (response2.statusResponse) {
        navigation.navigate("Main");
      }
    }
  }

  async getRecipe(url) {
    this.setState({ loading: true });
    const res = await Axios.get(url).then((result) => {
      return result.data;
    });
    return res;
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.state.loading == true ? (
            <Loading isVisible={this.state.loading} text="Loading recipe..." />
          ) : (
            <View
              style={{ marginTop: 35, flex: 1, backgroundColor: COLORS.white }}
            >
              <View
                style={{
                  marginTop: -1000,
                  paddingTop: 1000,
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={
                    this.state.recipe.image == null
                      ? require("../../assets/backgroundlogo.png")
                      : { uri: this.state.recipe.image }
                  }
                  resizeMode="contain"
                  style={{
                    height: 350,
                    width: "200%",
                  }}
                />
              </View>
              <View>
                <Text style={{ ...FONTS.h4, marginLeft: 10, marginTop: 10 }}>
                  {this.state.recipe.title}
                </Text>
                <Text
                  style={{
                    ...FONTS.body5,
                    color: COLORS.secondary,
                    marginLeft: 10,
                  }}
                >
                  {this.state.recipe.readyInMinutes} mins |{" "}
                  {this.state.recipe.servings} Serving
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.primary,
                    marginTop: 20,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  Ingredients
                </Text>
                <FlatList
                  data={this.state.recipe.extendedIngredients}
                  keyExtractor={(item) => `${item.id}`}
                  showsVerticalScrollIndicator={true}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 30,
                        marginVertical: 5,
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          height: 50,
                          width: 50,
                          borderRadius: 5,
                          backgroundColor: COLORS.lightGray,
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              "https://spoonacular.com/cdn/ingredients_100x100/" +
                              item.image,
                          }}
                          style={{
                            height: 40,
                            width: 40,
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          paddingHorizontal: 20,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            ...FONTS.body3,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      <View
                        style={{
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            ...FONTS.body3,
                          }}
                        >
                          {item.measures.us.amount} {item.measures.us.unitShort}
                        </Text>
                      </View>
                    </View>
                  )}
                />
                {/* </View> */}
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.primary,
                    marginTop: 20,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  Nutritional Information
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <View style={styles.nut}>
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.calories} Calories
                    </Text>
                  </View>
                  <View style={styles.nut}>
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.carbs} Carbs
                    </Text>
                  </View>
                  <View style={styles.nut}>
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.fat} Fat
                    </Text>
                  </View>
                  <View style={styles.nut}>
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.protein} Protein
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingTop: 30,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.primary,
                    marginTop: 20,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  How to do it
                </Text>
                <FlatList
                  data={this.state.recipe.analyzedInstructions}
                  keyExtractor={(item) => `${item.steps}`}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
                        flex: 1,
                      }}
                    >
                      <FlatList
                        data={item.steps}
                        keyExtractor={(item) => `${item.step}`}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingHorizontal: 30,
                              marginVertical: 5,
                              flex: 1,
                            }}
                          >
                            <View
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                height: 50,
                                width: 50,
                                borderRadius: 5,
                                backgroundColor: COLORS.lightGray,
                              }}
                            >
                              <Text
                                style={{
                                  ...FONTS.body3,
                                }}
                              >
                                {item.number}
                              </Text>
                            </View>

                            <View
                              style={{
                                paddingHorizontal: 20,
                                justifyContent: "center",
                                width: 320,
                              }}
                            >
                              <Text
                                style={{
                                  ...FONTS.body3,
                                }}
                              >
                                {item.step}
                              </Text>
                            </View>
                          </View>
                        )}
                      ></FlatList>
                    </View>
                  )}
                ></FlatList>
              </View>
              <View
                style={{
                  margin: 10,
                  flex: 1,
                }}
              >
                <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
                  Record your time
                </Text>
                    <View
                      style={{
                        alignContent: "center",
                        flex: 1,
                        marginTop:10
                      }}
                    >
                      <DisplayComponent
                        horas={this.state.horas}
                        minutos={this.state.minutos}
                        segundos={this.state.segundos}
                      />
                      </View>
                      {/* <BtnComponent
                          status={this.state.status}
                          resume={this.resume}
                          reset={this.reset}
                          stop={this.stop}
                          start={this.start}
                        />  */}
                     <View
                        style={{
                          paddingTop: 30,
                          flex: 1,
                        }}
                      > 
                      
                        {this.state.status == 0 ? (
                          <Button
                            buttonStyle={{
                              backgroundColor: "#4f44eb",
                              marginTop: 30,
                              marginLeft: 5,
                              borderWidth: 2,
                              padding: 12,
                              width: 70,
                              height: 70,
                              borderRadius: 100,
                              borderColor: "#eb2d2d",
                              borderStyle: "solid", 
                            }}
                            //onPress={() =>this.start()}
                          >
                            <Icon
                              type="material-community"
                              name="record"
                              color="#eb2d2d"
                            />
                          </Button>
                        ) : (
                          <Text></Text>
                        )}

                        {this.state.status == 1 ? (
                          <View>
                            <Button
                              buttonStyle={{
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
                                borderStyle: "solid",
                              }}
                              onPress={this.stop()}
                            >
                              <Icon
                                type="material-community"
                                name="pause"
                                color="#00ABA9"
                              />
                            </Button>
                            <Button
                              buttonStyle={{
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
                                borderStyle: "solid",
                              }}
                              onPress={this.reset()}
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

                        {this.state.status == 2 ? (
                          <View>
                            <Button
                              buttonStyle={{
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
                                borderStyle: "solid",
                              }}
                              onPress={this.resume()}
                            >
                              <Icon
                                type="material-community"
                                name="play"
                                color="#4f44eb"
                              />
                            </Button>
                            <Button
                              buttonStyle={{
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
                                borderStyle: "solid",
                              }}
                              onPress={this.reset()}
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
                  </View>
              {/* <View>
                  <FAB
                    style={styles.fab}
                    small
                    label="Finish recipe"
                    onPress={() => this.addToHistory()}
                  ></FAB>
                </View> */}
              {/* </View> */}

              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 90,
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  paddingHorizontal: SIZES.padding,
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 50,
                    width: SIZES.width * 0.15,
                    backgroundColor: "white",
                    borderBottomRightRadius: SIZES.radius,
                    shadowColor: "black",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                    elevation: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    ...styles.shadow,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 45,
                      width: 45,
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <Icon
                      type="material-community"
                      name="arrow-left-circle"
                      color="gray"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: 50,
                    width: SIZES.width * 0.15,
                    backgroundColor: "white",
                    borderBottomLeftRadius: SIZES.radius,
                    shadowColor: "black",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,
                    elevation: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    ...styles.shadow,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 45,
                      width: 45,
                      color: COLORS.lightGray,
                    }}
                  >
                    <Icon
                      type="material-community"
                      name={this.state.favourite ? "heart" : "heart-outline"}
                      onPress={() =>
                        this.state.favourite
                          ? this.removeFavourite()
                          : this.addFavourite()
                      }
                      color={this.state.favourite ? "crimson" : "gray"}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    marginTop: 10,
    alignContent: "center",
    width: "fit-content",
    alignSelf: "center",
    marginBottom: 25,
  },
  nut: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: COLORS.primary,
    width: "40%",
    marginBottom: 10,
    padding: 15,
    flex: 1,
  },
  btnCloseSession : {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#F4F5A9",
    borderTopWidth: 1,
    borderTopColor: "#F4F5A9",
    borderBottomWidth: 1,
    borderBottomColor: "#F4F5A9",
    paddingVertical: 10,
    width: "50%",
    alignSelf: "center"
},
btnCloseSessionTitle : {
    color: "#000000"
}
});
