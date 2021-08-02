import React from "react";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase";
import "firebase/firebase-firestore";
import DisplayComponent from "../../components/DisplayComponent";
import { FAB } from "react-native-paper";
import Loading from "../../components/Loading";
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

export default class HistoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const response = await this.getHistory();
    this.setState({
      recipes: response.history,
      loading: false,
    });
  }

  async getHistory() {
    this.setState({ loading: true });
    const db = firebase.firestore(firebaseApp);
    const result = { statusResponse: true, error: null, history: [] };
    try {
      const histDoc = await db
        .collection("history")
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      await Promise.all(
        map(histDoc.docs, async (doc) => {
          const record = doc.data();
          result.history.push(record);
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
        {this.state.loading == true ? (
          <Loading isVisible={this.state.loading} text="Loading..." />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ padding: SIZES.padding * 2 }}>
              <View
                style={{
                  backgroundColor: "midnightblue",
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
                  Your recipes history
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

                    <View
                      style={{
                        marginTop: SIZES.padding,
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ ...FONTS.body4, fontWeight: "bold" }}>
                        Date:
                      </Text>
                      <Text
                        style={{
                          ...FONTS.body4,
                          color: "gray",
                          paddingLeft: 5,
                        }}
                      >
                        {item.date}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ ...FONTS.body4, fontWeight: "bold" }}>
                        Your time:
                      </Text>
                      {item.timeSpent.s == 0 ? (
                        <Text
                          style={{
                            ...FONTS.body4,
                            color: "gray",
                            paddingLeft: 5,
                          }}
                        >
                          No record
                        </Text>
                      ) : (
                        <Text
                          style={{
                            ...FONTS.body4,
                            color: "gray",
                            paddingLeft: 5,
                          }}
                        >
                          <DisplayComponent time={item.timeSpent} />
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                }}
              />
            </View>
            <FAB
              style={styles.fab}
              large
              icon="undo"
              onPress={() => navigation.goBack()}
            ></FAB>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 630
  },
});
