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
import { Icon } from "react-native-elements";
import { SIZES, COLORS, FONTS } from "../../constants";
import Axios from "axios";
import DisplayComponent from "../../components/DisplayComponent";
import BtnComponent from "../../components/BtnComponent";
//import "../../components/Timer.css";
import { FAB } from "react-native-paper";
import Loading from "../../components/Loading";

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
      time: { s: 0, m: 0, h: 0 },
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

  start = () => {
    this.run();
    this.setState({
      status: 1,
      interv: setInterval(this.run, 1000),
    });
  };

  run = () => {
    var updatedS = this.state.time.s,
      updatedM = this.state.time.m,
      updatedH = this.state.time.h;

    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;

    this.setState({
      time: { s: updatedS, m: updatedM, h: updatedH },
    });
  };

  stop = () => {
    clearInterval(this.state.interv);
    this.setState({
      status: 2,
    });
  };

  reset = () => {
    clearInterval(this.state.interv);
    this.setState({
      time: { s: 0, m: 0, h: 0 },
      status: 0,
    });
  };

  resume = () => this.start();

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
    if (this.state.recipe.image == null) {
      const response1 = await addDocumentWithoutId("history", {
        idUser: getCurrentUser().uid,
        idRecipe: this.state.recipeId,
        title: this.state.recipe.title,
        readyInMinutes: this.state.recipe.readyInMinutes,
        timeSpent: this.state.time,
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
        timeSpent: this.state.time,
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
      <View>
        {this.state.loading == true ? (
          <Loading isVisible={this.state.loading} text="Loading recipe..." />
        ) : (
          <View>
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
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.white,
              }}
            >
              <View
                style={{
                  margin: 20,
                }}
              >
                <Text style={{ ...FONTS.h4 }}>{this.state.recipe.title}</Text>
                <Text style={{ ...FONTS.body5, color: COLORS.secondary }}>
                  {this.state.recipe.readyInMinutes} mins |{" "}
                  {this.state.recipe.servings} Serving
                </Text>
              </View>
              <FlatList
                data={this.state.recipe.extendedIngredients}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 30,
                      marginVertical: 5,
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
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.white,
                  paddingTop: 30,
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
                    Nutritional Information
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    width: "60%",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                      backgroundColor: COLORS.lightGray,
                      border: "dashed",
                      borderColor: COLORS.primary,
                      margin: 5,
                      padding: 5,
                    }}
                  >
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.calories} Calories
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                      backgroundColor: COLORS.lightGray,
                      border: "dashed",
                      borderColor: COLORS.primary,
                      margin: 5,
                      padding: 5,
                    }}
                  >
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.carbs} Carbs
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                      backgroundColor: COLORS.lightGray,
                      border: "dashed",
                      borderColor: COLORS.primary,
                      margin: 5,
                      padding: 5,
                    }}
                  >
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.fat} Fat
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                      backgroundColor: COLORS.lightGray,
                      border: "dashed",
                      borderColor: COLORS.primary,
                      margin: 5,
                      padding: 5,
                    }}
                  >
                    <Text style={{ ...FONTS.body3 }}>
                      {this.state.recipeNutrition.protein} Protein
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.white,
                  paddingTop: 30,
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
                    How to do it
                  </Text>
                </View>
                <FlatList
                  data={this.state.recipe.analyzedInstructions}
                  keyExtractor={(item) => `${item.steps}`}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 5,
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
                                flex: 1,
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
                <View
                  style={{
                    margin: 10,
                  }}
                >
                  <Text style={{ ...FONTS.h4, color: COLORS.primary }}>
                    Record your time
                  </Text>
                  {/* <div className="main-section">
                    <div className="clock-holder">
                      <div className="stopwatch">
                        <DisplayComponent time={this.state.time} />
                        <BtnComponent
                          status={this.state.status}
                          resume={this.resume}
                          reset={this.reset}
                          stop={this.stop}
                          start={this.start}
                        />
                      </div>
                    </div>
                  </div> */}
                </View>
                <View>
                  <FAB
                    style={styles.fab}
                    small
                    label="Finish recipe"
                    onPress={() => this.addToHistory()}
                  ></FAB>
                </View>
              </View>
            </View>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#C64755",
  },
  fab: {
    marginTop: 10,
    alignContent: "center",
    width: "fit-content",
    alignSelf: "center",
    marginBottom: 25,
  },
});
