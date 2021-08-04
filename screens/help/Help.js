import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { FAB } from "react-native-paper";
import DropDownItem from "react-native-drop-down-item";
import { FONTS } from "../../constants";

export default class Help extends React.Component {
  constructor(props) {
    super(props);
  }
  general = {
    contents: [
      {
        title: "How can I view my recipes history?",
        body: "In the view of your profile by pressing the last button on the bottom bar, you will find your recipe history.",
      },
      {
        title: "How can I add a recipe to favorites?",
        body: "When accessing the details of a recipe, you can add it to favorites by pressing the heart button.",
      },
      {
        title: "How can I change my password?",
        body: "In the profile screen by pressing the last button on the bottom bar, in the user settings screen you can change the password, email, name and surname.",
      },
      {
        title: "Why can't I find anything when searching for recipes in Spanish?",
        body: "Currently, the entire application is in English, therefore all searches will have to be done in English.",
      },
      {
        title: "What foods does the app recognize when adding a photo?",
        body: "Currently, through images, the application only recognizes apple, avocado, banana, cucumber, eggplant, lemon, onion, pepper, potato, lettuce, carrot, tomato, garlic",
      },
    ],
  };

  foodList = {
    contents: [
      {
        title: "How can I add an ingredient?",
        body: "Typing an ingredient in the search bar will bring up the ingredients available in the app that match your search.",
      },
      {
        title: "How can I remove an ingredient?",
        body: "You can remove an individual ingredient by clicking on the trash can to the right of the ingredient name, you can also remove all ingredients from the list by pressing the floating button with the trash can.",
      },
      {
        title: "What are pantry items?",
        body: "Pantry items are basic ingredients such as: salt, oil...",
      },
      {
        title: "How to find a recipe with ingredients that I have?",
        body: "Select by pressing the checkbox of the ingredients that you want your recipe to contain, and then press the floating button that contains a magnifying glass.",
      },
    ],
  };

  shoppingList = {
    contents: [
      {
        title: "How can I add an ingredient to my shopping list?",
        body: "You can add an ingredient to your list by writing the text in the top bar and then pressing the add button.",
      },
      {
        title: "How can I remove an ingredient from my shopping list?",
        body: "You can remove an individual ingredient by clicking on the trash can to the right of the ingredient name, you can also remove all ingredients from the list by pressing the floating button with the trash can.",
      },
      {
        title: "How can I mark a food on the list as purchased?",
        body: "By pressing the checkbox button to the left of an ingredient, that ingredient will appear crossed out.",
      },
    ],
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={{ ...FONTS.h1, marginTop: 70, alignSelf: "center" }}>
            Help of FoodUs
          </Text>
          <View style={styles.container1}>
            <Text style={{ ...FONTS.h1, paddingLeft: 10 }}>General</Text>
            <ScrollView style={{ alignSelf: "stretch" }}>
              {this.general.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    header={
                      <View style={styles.header}>
                        <Text
                          style={{
                            fontSize: 25,
                            color: "blue",
                          }}
                        >
                          {param.title}
                        </Text>
                      </View>
                    }
                  >
                    <Text
                      style={[
                        styles.txt,
                        {
                          fontSize: 20,
                        },
                      ]}
                    >
                      {param.body}
                    </Text>
                  </DropDownItem>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.container2}>
            <Text style={{ ...FONTS.h1, marginTop: 30, paddingLeft: 10 }}>
              Food List
            </Text>
            <ScrollView>
              {this.foodList.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    header={
                      <View style={styles.header}>
                        <Text
                          style={{
                            fontSize: 25,
                            color: "blue",
                          }}
                        >
                          {param.title}
                        </Text>
                      </View>
                    }
                  >
                    <Text
                      style={[
                        styles.txt,
                        {
                          fontSize: 20,
                        },
                      ]}
                    >
                      {param.body}
                    </Text>
                  </DropDownItem>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.container2}>
            <Text style={{ ...FONTS.h1, marginTop: 30, paddingLeft: 10 }}>
              Shopping List
            </Text>
            <ScrollView>
              {this.shoppingList.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    header={
                      <View style={styles.header}>
                        <Text
                          style={{
                            fontSize: 25,
                            color: "blue",
                          }}
                        >
                          {param.title}
                        </Text>
                      </View>
                    }
                  >
                    <Text
                      style={[
                        styles.txt,
                        {
                          fontSize: 20,
                        },
                      ]}
                    >
                      {param.body}
                    </Text>
                  </DropDownItem>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
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
  container: {
    minHeight: "100%",
    backgroundColor: "#FFFFFF",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 670,
  },
  container1: {
    //justifyContent: "center",
    //alignItems: "center",
    paddingTop: 30,
  },
  container2: {
    //justifyContent: "center",
    //alignItems: "center",
  },
  header: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    fontSize: 14,
  },
});
