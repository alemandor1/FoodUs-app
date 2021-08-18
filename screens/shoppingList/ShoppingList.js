import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  CheckBox,
  FlatList,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Input, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { SIZES, FONTS, COLORS } from "../../constants";
import { FAB } from "react-native-paper";
import { size } from "lodash";

import {
  getCurrentUser,
  addDocumentWithoutId,
  updateDocument,
} from "../../utils/actions";
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firebase-firestore";
import Loading from "../../components/Loading";
import { onlyLetters } from "../../utils/helpers";

export default function ShoopingList({ navigation }) {
  const db = firebase.firestore(firebaseApp);

  //añadimos el ingrediente a mi lista de la compra (firebase)
  const [state, setState] = useState({ name: "" });
  const [errorName, setErrorName] = useState("");
  const [ingredientsDB, setIngredientsDB] = useState([]);

  const onChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  //cogemos los nombres de los ingredientes de la shoppingList
  useEffect(() => {
    firebase
      .firestore()
      .collection("shoppingList")
      .where("idUser", "==", getCurrentUser().uid) //HE AÑADIDO ESTA LÍNEA REVISAR BIEN
      .onSnapshot((querySnapshot) => {
        const ingredients = [];
        querySnapshot.docs.forEach((doc) => {
          const { name } = doc.data();
          ingredients.push({
            name,
          });
        });
        setIngredientsDB(ingredients);
      });
  }, []);

  const ingredientsName = [];

  for (let i = 0; i < ingredientsDB.length; i++) {
    let element = ingredientsDB[i].name;
    ingredientsName.push(element);
  }

  const validateData = () => {
    setErrorName("");
    let isValid = true;

    if (ingredientsName.includes(state.name.toLowerCase())) {
      setErrorName(
        "This ingredient has already been added to the list before."
      );
      isValid = false;
    }

    if (!onlyLetters(state.name)) {
      setErrorName("You must enter a valid name.");
      isValid = false;
    }

    if (size(state.name) > 10) {
      setErrorName("you must write a name with less than 10 letters.");
      isValid = false;
    }
    return isValid;
  };

  const addIngredient = async () => {
    if (!validateData()) {
      return;
    } else {
      setLoading(true);
      const addIngredient = await addDocumentWithoutId("shoppingList", {
        idUser: getCurrentUser().uid,
        checked: false,
        name: state.name.toLowerCase(),
        quantity: 1,
      });

      if (addIngredient.statusResponse) {
        const response2 = await getMyIngredients();
        setMyShoppingList(response2.myIngredients);
      }
      setLoading(false);
    }
  };

  const getMyIngredients = async () => {
    const result = { statusResponse: true, error: null, myIngredients: [] };
    try {
      const response = await db
        .collection("shoppingList")
        .where("idUser", "==", getCurrentUser().uid)
        .get();

      response.forEach((doc) => {
        const foodData = doc.data();
        result.myIngredients.push(foodData);
      });
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    return result;
  };

  const [myShoppingList, setMyShoppingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getMyIngredients();
        setMyShoppingList(response.myIngredients);
        setLoading(false);
      }
      getData();
      setReloadData(false);
    }, [reloadData])
  );

  //Encontrar el id del documento del ingrediente seleccionado (check)
  const findDocId = async (name) => {
    return db
      .collection("shoppingList")
      .where("idUser", "==", getCurrentUser().uid)
      .where("name", "==", name)
      .get()
      .then((collection) => {
        let docId;
        collection.forEach((doc) => (docId = doc.id));
        return docId;
      });
  };

  //Obtenemos la data del ingrediente seleccionado
  const findDataIngredient = async (name) => {
    return db
      .collection("shoppingList")
      .where("idUser", "==", getCurrentUser().uid)
      .where("name", "==", name)
      .get()
      .then((collection) => {
        let dataIngredient;
        collection.forEach((doc) => (dataIngredient = doc.data()));
        return dataIngredient;
      });
  };

  const onchecked = async (name) => {
    const docDataIngredient = await findDataIngredient(name);
    const valueChecked = docDataIngredient.checked;

    if (valueChecked == true) {
      const docId = await findDocId(name);
      const updateCheck = await updateDocument("shoppingList", docId, {
        checked: false,
      });
      if (updateCheck.statusResponse) {
        const response2 = await getMyIngredients();
        setMyShoppingList(response2.myIngredients);
      }
    } else {
      const docId = await findDocId(name);
      const updateCheck = await updateDocument("shoppingList", docId, {
        checked: true,
      });
      if (updateCheck.statusResponse) {
        const response2 = await getMyIngredients();
        setMyShoppingList(response2.myIngredients);
      }
    }
  };

  const handleQuantityIncrease = async (name) => {
    const docDataIngredient = await findDataIngredient(name);
    const quantity = docDataIngredient.quantity;

    const docId = await findDocId(name);
    await updateDocument("shoppingList", docId, {
      quantity: quantity + 1,
    });
    const response2 = await getMyIngredients();
    setMyShoppingList(response2.myIngredients);
  };

  const handleQuantityDecrease = async (name) => {
    const docDataIngredient = await findDataIngredient(name);
    const quantity = docDataIngredient.quantity;

    const docId = await findDocId(name);
    await updateDocument("shoppingList", docId, {
      quantity: quantity - 1,
    });
    const response2 = await getMyIngredients();
    setMyShoppingList(response2.myIngredients);
  };

  //Eliminar ingrediente de la lista
  const deleteIngredientShoppingList = async (name) => {
    const result = { statusResponse: true, error: null };
    try {
      const response = await db
        .collection("shoppingList")
        .where("name", "==", name)
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      response.forEach(async (doc) => {
        const ingListId = doc.id;
        await db.collection("shoppingList").doc(ingListId).delete();
      });
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    if (result.statusResponse) {
      setLoading(true);
      const response2 = await getMyIngredients();
      setMyShoppingList(response2.myIngredients);
      setLoading(false);
    }
    return result;
  };

  //Eliminar toda la lista de ingredientes
  const deleteAllShoppingList = async () => {
    const result = { statusResponse: true, error: null };
    try {
      const response = await db
        .collection("shoppingList")
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      response.forEach(async (doc) => {
        const ingListId = doc.id;
        await db.collection("shoppingList").doc(ingListId).delete();
      });
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    if (result.statusResponse) {
      setLoading(true);
      const response2 = await getMyIngredients();
      setMyShoppingList(response2.myIngredients);
      setLoading(false);
    }
    return result;
  };

  const alertDeleteShoppingList = () =>
    Alert.alert(
      "Alert Message",
      "Are you sure you want to remove all the ingredients from your shopping list?.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteAllShoppingList() },
      ]
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ padding: SIZES.padding * 3 }}>
        <View
          style={{
            backgroundColor: "#67C7BB",
            borderBottomRightRadius: SIZES.radius,
            borderBottomLeftRadius: SIZES.radius,
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
            Shopping List
          </Text>
        </View>
      </View>
      <View>
        <Input
          containerStyle={styles.input}
          placeholder="Enter an ingredient..."
          onChangeText={(value) => onChange("name", value)}
          errorMessage={errorName}
          rightIcon={
            <Icon
              type="material-comunity"
              name="add-circle-outline"
              color="#000000"
              onPress={() => addIngredient()}
            />
          }
        />
      </View>
      <View style={{ flex: 1, paddingBottom: 35 }}>
        <ScrollView>
          <FlatList
            data={myShoppingList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              padding: 20,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  padding: 20,
                  marginBottom: 20,
                  backgroundColor: "#E8F6F3",
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  value={item.checked}
                  onValueChange={() => {
                    onchecked(item.name);
                  }}
                />
                <View>
                  {item.checked ? (
                    <>
                      <Text
                        style={{
                          ...FONTS.h3,
                          color: "black",
                          paddingLeft: 25,
                          paddingRight: 5,
                          textDecorationLine: "line-through",
                          textDecorationStyle: "solid",
                        }}
                      >
                        {item.name}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          ...FONTS.h3,
                          color: "black",
                          paddingLeft: 25,
                          paddingRight: 5,
                        }}
                      >
                        {item.name}
                      </Text>
                    </>
                  )}
                </View>
                <Icon
                  type="material-comunity"
                  name="delete-forever"
                  color="#AA1408"
                  onPress={() => deleteIngredientShoppingList(item.name)}
                />
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", marginBottom: 10 }}
                >
                  {item.quantity}
                </Text>
                <View style={styles.actionBtn}>
                  <Icon
                    name="remove"
                    onPress={() => handleQuantityDecrease(item.name)}
                    size={25}
                    color={COLORS.white}
                  />
                  <Icon
                    name="add"
                    onPress={() => handleQuantityIncrease(item.name)}
                    size={25}
                    color={COLORS.white}
                  />
                </View>
                {/* </View> */}
              </View>
            )}
          />
        </ScrollView>
      </View>

      <FAB
        style={styles.fab2}
        large
        icon="delete"
        onPress={() => alertDeleteShoppingList()}
      ></FAB>
      <FAB
        style={styles.fab}
        large
        icon="undo"
        onPress={() => navigation.goBack()}
      ></FAB>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 670,
  },
  fab2: {
    position: "absolute",
    margin: 16,
    right: 0,
    top: 610,
  },
  input: {
    width: "75%",
    alignSelf: "center",
  },
  actionBtn: {
    width: 70,
    height: 25,
    backgroundColor: "#5B74CC",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
