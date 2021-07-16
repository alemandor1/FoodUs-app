import React, { useState } from "react";
import Loading from "../../components/Loading";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { getFavourites } from "../../utils/actions";
import { useFocusEffect } from "@react-navigation/native";
import { SIZES, FONTS, COLORS } from "../../constants";

export default function Favourites({ navigation }) {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getFavourites();
        if (response.statusResponse == true) {
          setRecipes(response.favourites);
        }        
        setLoading(false);
      }

      getData();
    }, [])
  );


  return (
    <View style={{ flex: 1 }}>
      {loading == true ? (
        <Loading isVisible={loading} text="Loading..." />
      ) : (
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
              data={recipes}
              keyExtractor={(item) => item.idRecipe}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginBottom: SIZES.padding * 2,
                  }}
                  onPress={() =>
                    navigation.navigate("Recipe", {
                      id: item.idRecipe,
                    })
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
      )}
    </View>
  );
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
