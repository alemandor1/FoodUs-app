import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";

import { SIZES, FONTS, COLORS, icons } from "../../constants";

const HEADER_HEIGHT = 350;

const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);

  function renderHeaderBar() {
    return (
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
          {/* Back Button */}
          <TouchableOpacity
          style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 35,
              width: 35,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              backgroundColor: COLORS.transparentBlack5
          }}
          onPress={() => navigation.goBack()}
          >
              <Image
              source={icons.back}
              style={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.lightGray
              }}
              />

          </TouchableOpacity>

          {/* Favourite */}
          <TouchableOpacity
          style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 35,
              width: 35
          }}
          >
              <Image
              source={selectedRecipe?.isFavourite ? icons.
                favouriteFilled : icons.favourite}
              style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.darkGreen
              }}
              />
        </TouchableOpacity>
      </View>
    );
  }

  function renderRecipeCardHeader() {
    return (
      <View
        style={{
          marginTop: -1000,
          paddingTop: 1000,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderRecipeCardHeader()}

            {/* Info */}

            {/* Ingredient Title */}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 30,
              marginVertical: 5,
            }}
          >
            {/* Icon */}
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
                source={item.icon}
                style={{
                  height: 40,
                  width: 40,
                }}
              />
            </View>

            {/* Description */}
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
                {item.description}
              </Text>
            </View>

            {/* Quantity */}
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
                {item.quantity}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Header Bar */}
      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;