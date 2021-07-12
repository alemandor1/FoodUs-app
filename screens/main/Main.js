import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { myicons, SIZES, COLORS, FONTS } from "../../constants";
import { SearchBar, Icon, Input } from "react-native-elements";
import Axios from "axios";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: false,
      categories: [],
      selectedCategory: "",
      query: "",
      APIkey: "6812c1d4a76d4a6dbe7b8ef99427f05d"
    };
  }

  async componentDidMount() {
    const res = await this.getRecipes("https://api.spoonacular.com/recipes/random?number=20&apiKey=" + this.state.APIkey);
    const categoryData = await this.getCategories();
    this.setState({
      recipes: res.recipes,
      categories: categoryData,
      loading: false,
    });
  }

  async onSelectCategory(category) {
    const recipesList = await this.getRecipes(category.url);
    this.setState({
      recipes: recipesList.recipes,
      selectedCategory: category,
    });
  }

  async offSelectCategory() {
    const recipesList = await this.getRecipes("https://api.spoonacular.com/recipes/random?number=20&apiKey=" + this.state.APIkey);
    this.setState({
      recipes: recipesList.recipes,
      selectedCategory: "",
    });
  }

  async getRecipes(url) {
    this.setState({ loading: true });
    const res = await Axios.get(url).then((result) => {
      return result.data;
    });
    return res;
  }

  async doSearch(query) {
    const res = await this.getRecipes("https://api.spoonacular.com/recipes/complexSearch?query=" + {query} + "&number=20&apiKey=" + this.state.APIkey);
    this.setState({
      recipes: res.results
    })
  }

  onChange(e) {
    this.setState({
      query: e
    });
  }

  async getCategories() {
    const categoryData = [
      {
        id: 1,
        name: "Drinks",
        icon: myicons.coctel,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=drink&apiKey=" + this.state.APIkey,
      },
      {
        id: 2,
        name: "Appetizer",
        icon: myicons.aperitivo,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=appetizer&apiKey=" + this.state.APIkey,
      },
      {
        id: 3,
        name: "Bread",
        icon: myicons.pan,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=bread&apiKey=" + this.state.APIkey,
      },
      {
        id: 4,
        name: "Breakfast",
        icon: myicons.desayuno,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=breakfast&apiKey=" + this.state.APIkey,
      },
      {
        id: 5,
        name: "Sauce",
        icon: myicons.salsas,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=sauce&apiKey=" + this.state.APIkey,
      },
      {
        id: 6,
        name: "Dessert",
        icon: myicons.postre,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=dessert&apiKey=" + this.state.APIkey,
      },
      {
        id: 7,
        name: "Main course",
        icon: myicons.maincourse,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=main%20course&apiKey=" + this.state.APIkey,
      },
      {
        id: 8,
        name: "Snacks",
        icon: myicons.entrantes,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=snack&apiKey=" + this.state.APIkey,
      },
      {
        id: 9,
        name: "Marinade",
        icon: myicons.escabeche,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=marinade&apiKey=" + this.state.APIkey,
      },
      {
        id: 10,
        name: "Salad",
        icon: myicons.ensalada,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=salad&apiKey=" + this.state.APIkey,
      },
      {
        id: 11,
        name: "Finger food",
        icon: myicons.canape,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=fingerfood&apiKey=" + this.state.APIkey,
      },
      {
        id: 12,
        name: "Soups",
        icon: myicons.sopa,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=soup&apiKey=" + this.state.APIkey,
      },
      {
        id: 13,
        name: "Sweets",
        icon: myicons.sweet,
        url: "https://api.spoonacular.com/recipes/random?number=20&tags=sweets&apiKey=" + this.state.APIkey,
      },
    ];
    return categoryData;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: SIZES.padding * 2 }}>
          <Text style={{ ...FONTS.h1, marginTop: 15 }}>Main Categories</Text>
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
                  backgroundColor:
                    this.state.selectedCategory?.id == item.id
                      ? COLORS.primary
                      : COLORS.white,
                  borderRadius: SIZES.radius,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: SIZES.padding,
                  ...styles.shadow,
                }}
                onPress={() => this.state.selectedCategory?.id == item.id ? this.offSelectCategory() : this.onSelectCategory(item)}
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
          {/* <SearchBar
            placeholder="Looking for a recipe?"
            onChangeText={this.updateSearch}
            value={search}
            containerStyle={{
              backgroundColor: COLORS.transparent, 
              borderTopWidth:0,
              borderBottomWidth:0,}}
            inputContainerStyle={{backgroundColor: 'white'}}
          /> */}
          <SafeAreaView>
            <Input
              placeholder="   Looking for a recipe?"
              onChange={(e) => this.onChange(e)}
              style={styles.input}
              rightIcon={
                <Icon
                    type="material-community"
                    name="magnify"
                    onPress= {() => this.doSearch(this.state.query)}
                />
            }
            />
          </SafeAreaView>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.recipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Recipe", item)}
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
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      height: 50,
                      width: SIZES.width * 0.3,
                      backgroundColor: COLORS.primary,
                      borderTopRightRadius: SIZES.radius,
                      borderBottomLeftRadius: SIZES.radius,
                      alignItems: "center",
                      justifyContent: "center",
                      ...styles.shadow,
                    }}
                  >
                    <Text style={{ ...FONTS.h4, color: "white" }}>
                      {item.readyInMinutes} minutes
                    </Text>
                  </View>
                </View>

                <Text style={{ ...FONTS.body2 }}>{item.title}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding * 2,
              paddingBottom: 30,
              marginBottom: 20,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    backgroundColor: "white",
  },
});
