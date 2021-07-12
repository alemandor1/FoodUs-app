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
  getIsFavorite
} from '../../utils/actions'
import { Icon, Button } from "react-native-elements";
import { SIZES, COLORS, FONTS } from "../../constants";

export default class DoRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recipeId: this.props.route.params.recipeId,
      APIkey: "6812c1d4a76d4a6dbe7b8ef99427f05d",
      favourite: false,
    };
  }

  async componentDidMount() {
    const fav = await getIsFavorite(this.state.recipeId);
    if (fav) {
      this.setState({
        favourite: fav.favourite,
      });
    }
    this.setState({
      loading: false,
    });
  }

  async removeFavourite() {
    this.setState({ loading: true });
    const response = await deleteFavorite(this.state.recipeId);
    this.setState({ loading: false });

    if (response.statusResponse) {
      this.setState({ favourite: false });
    }
  }

  async addFavourite() {
    this.setState({ loading: true });
    const response = await addDocumentWithoutId("favourites", {
      idUser: getCurrentUser().uid,
      idRecipe: this.state.recipeId,
      title: this.state.recipe.title,
      image: this.state.recipe.image,
      readyInMinutes: this.state.recipe.readyInMinutes,
    });
    this.setState({ loading: false });
    if (response.statusResponse) {
      this.setState({ favourite: true });
    }
  }

  render() {
    const { navigation } = this.props;
    const { image, title, readyInMinutes, servings, extendedIngredients, 
      calories, carbs, protein, fat, analyzedInstructions } = this.props.route.params;
    return (
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
              image == null
                ? require("../../assets/backgroundlogo.png")
                : { uri: image }
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
            <Text style={{ ...FONTS.h4 }}>{title}</Text>
            <Text style={{ ...FONTS.body5, color: COLORS.secondary }}>
              {readyInMinutes} mins | {servings} Serving
            </Text>
          </View>
          <FlatList
            data={extendedIngredients}
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
              flexDirection: "row",
              alignSelf: "center",
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
                {calories} Calories
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
                {carbs} Carbs
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
                {fat} Fat
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
                {protein} Protein
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
            data={analyzedInstructions}
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
              margin: 20,
            }}
          >
            <Button
              title="Close recipe"
              containerStyle={styles.btnContainer}
              buttonStyle={styles.btn}
              onPress={() => navigation.navigate("Main")}
            />
          </View>
        </View>
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
});
