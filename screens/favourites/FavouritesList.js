import React from "react";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase";
import "firebase/firebase-firestore";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { map } from "lodash";
import { getCurrentUser } from "../../utils/actions";
import { SIZES, COLORS, FONTS } from "../../constants";

export default class FavouritesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    const response = await this.getFavourites();
    this.setState({
      recipes: response.favourites,
      loading: false,
    });
  }

  async getFavourites() {
    const db = firebase.firestore(firebaseApp);
    const result = { statusResponse: true, error: null, favourites: [] };
    try {
      const favDoc = await db
        .collection("favourites")
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      await Promise.all(
        map(favDoc.docs, async (doc) => {
          const favourite = doc.data();
          result.favourites.push(favourite);
        })
      );
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    return result;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: SIZES.padding * 2 }}>
          <View
            style={{
              backgroundColor: "crimson",
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
              Favourite recipes
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.recipes}
          keyExtractor={(item) => item.idRecipe}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginBottom: SIZES.padding * 2,
              }}
              onPress={() => navigation.navigate("Recipe", {
                id: item.idRecipe
              })}
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
