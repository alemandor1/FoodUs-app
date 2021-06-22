import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { myicons, SIZES, COLORS, FONTS } from "../../constants";
import Axios from "axios";

export default class Main_copy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: false,
      url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&mealType=Snack",
      categories: [],
    };
  }

  async componentDidMount() {
    const res = await this.getRecipes();
    const categoryData = await this.getCategories();
    this.setState({
      recipes: res.hits,
      categories: categoryData,
      loading: false,
    });
  }

  /* onSelectCategory(category) {
    //filter restaurant
    let recipesList = recipes.filter(a => a.categories.includes(category.id))

    setRecipes(recipesList)

    setSelectedCategory(category)
} */

  async getRecipes() {
    this.setState({ loading: true });
    const res = await Axios.get(this.state.url).then((result) => {
      return result.data;
    });
    return res;
  }

  async getCategories() {
    const categoryData = [
      {
        id: 1,
        name: "Cócteles",
        icon: myicons.coctel,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Alcohol%20cocktail",
      },
      {
        id: 2,
        name: "Repostería",
        icon: myicons.galleta,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Biscuits%20and%20cookies",
      },
      {
        id: 3,
        name: "Bollería",
        icon: myicons.pan,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Bread",
      },
      {
        id: 4,
        name: "Cereales",
        icon: myicons.cereal,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Cereals",
      },
      {
        id: 5,
        name: "Condimentos y salsas",
        icon: myicons.salsas,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Condiments%20and%20sauces",
      },
      {
        id: 6,
        name: "Bebidas",
        icon: myicons.bebidas,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Drinks",
      },
      {
        id: 7,
        name: "Postres",
        icon: myicons.postre,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Desserts",
      },
      {
        id: 8,
        name: "Huevos",
        icon: myicons.huevos,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Egg",
      },
      {
        id: 9,
        name: "Platos principales",
        icon: myicons.maincourse,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Main%20course",
      },
      {
        id: 10,
        name: "Tortillas",
        icon: myicons.tortilla,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Omelet",
      },
      {
        id: 11,
        name: "Tortitas",
        icon: myicons.pancake,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Pancake",
      },
      {
        id: 12,
        name: "Comidas preparadas",
        icon: myicons.preps,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Preps",
      },
      {
        id: 13,
        name: "Conservas",
        icon: myicons.preserve,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Preserve",
      },
      {
        id: 14,
        name: "Ensaladas",
        icon: myicons.ensalada,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Salad",
      },
      {
        id: 15,
        name: "Sandwiches",
        icon: myicons.sandwich,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Sandwiches",
      },
      {
        id: 16,
        name: "Sopas",
        icon: myicons.sopa,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Soup",
      },
      {
        id: 17,
        name: "Entrantes",
        icon: myicons.entrantes,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Starter",
      },
      {
        id: 18,
        name: "Guarnición",
        icon: myicons.guarnicion,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Side%20dish",
      },
      {
        id: 19,
        name: "Dulces",
        icon: myicons.sweets,
        url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=dd07cbba&app_key=37f9e7ae6f5fee59605781496e2645b7&dishType=Sweets",
      },
    ];
    return categoryData;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={{ padding: SIZES.padding * 2 }}>
          <Text style={{ ...FONTS.h1, marginTop: 15 }}>Categorías Principales</Text>
          <FlatList
            data={this.state.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: SIZES.padding,
                  paddingBottom: SIZES.padding * 2,
                  backgroundColor: /* (selectedCategory?.id == item.id) ? COLORS.primary : */ COLORS.white,
                  borderRadius: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: SIZES.padding,
                  ...styles.shadow,
                }}
                /* onPress={() => onSelectCategory(item)} */
              >
                <View
                  style={{
                    width: 70,
                    height: 50,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>

                <Text
                  style={{
                    marginTop: SIZES.padding,
                    color: COLORS.black,
                    ...FONTS.body5,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
          />
        </View>
        <View>
          <FlatList
            data={this.state.recipes}
            keyExtractor={(item) => item.recipe.label}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() =>
                  navigation.navigate("Recipe_copy", {
                    item,
                  })
                }
              >
                <View
                  style={{
                    marginBottom: SIZES.padding,
                  }}
                >
                  <Image
                    source={{uri: item.recipe.image}}
                    /* source={item.recipe.image} */
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: SIZES.radius,
                    }}
                  />
                  {/* <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      height: 50,
                      width: SIZES.width * 0.3,
                      backgroundColor: COLORS.white,
                      borderTopRightRadius: SIZES.radius,
                      borderBottomLeftRadius: SIZES.radius,
                      alignItems: "center",
                      justifyContent: "center",
                      ...styles.shadow,
                    }}
                  ></View> */}
                </View>

                <Text style={{ ...FONTS.body2 }}>{item.recipe.label}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding * 2,
              paddingBottom: 30,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
