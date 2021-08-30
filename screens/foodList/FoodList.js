import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  Text,
  FlatList,
  Switch,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Input, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { SIZES, FONTS } from "../../constants";
import {
  getCurrentUser,
  addDocumentWithoutId,
  updateDocument,
} from "../../utils/actions";
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firebase-firestore";
import { map } from "lodash";
import Loading from "../../components/Loading";
import { FAB } from "react-native-paper";

export default function FoodList({ navigation }) {
  const [ingredientsDB, setIngredientsDB] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //cogemos los ingredientes de la tabla en firebase
  useEffect(() => {
    firebase
      .firestore()
      .collection("ingredients")
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

  const [filtered, setFiltered] = useState(ingredientsName);
  const [searching, setSearching] = useState(false);

  //comprobar que el texto que se introduce en la barra coincide con algún ingrediente
  const onSearch = (text) => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = ingredientsName.filter((item) => {
        if (item.match(temp)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(ingredientsName);
    }
  };

  const db = firebase.firestore(firebaseApp);

  //obtener la lista de alimentos del usuario activo
  const getMyIngredients = async () => {
    const result = {
      statusResponse: true,
      error: null,
      myIngredients: [],
      myIngredientsName: [],
    };
    try {
      const response = await db
        .collection("foodList")
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      response.forEach((doc) => {
        const foodData = doc.data();
        result.myIngredients.push(foodData);
        const names = foodData.name;
        result.myIngredientsName.push(names);
      });
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    return result;
  };

  const [myFoodList, setMyFoodList] = useState([]);
  const [myFoodListNames, setMyFoodListNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [ingredientsTrue, setIngredientsTrue] = useState([]);

  //obtener la base de datos completa de todos los ingredientes de la aplicación
  const getTrueIngredients = async () => {
    const db = firebase.firestore(firebaseApp);
    const myIngredientsTrue = [];

    const response = await db
      .collection("foodList")
      .where("idUser", "==", getCurrentUser().uid)
      .where("checked", "==", true)
      .get();
    response.forEach((doc) => {
      const foodData = doc.data();
      myIngredientsTrue.push(foodData.name);
    });

    return myIngredientsTrue;
  };

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getMyIngredients();
        setMyFoodList(response.myIngredients);
        setMyFoodListNames(response.myIngredientsName);
        const response2 = await getTrueIngredients();
        setIngredientsTrue(response2);
        setLoading(false);
      }
      getData();
      setReloadData(false);
    }, [reloadData])
  );

  //Encontrar el id del documento del ingrediente seleccionado (check)
  const findDocId = async (id) => {
    return db
      .collection("foodList")
      .where("idUser", "==", getCurrentUser().uid)
      .where("idIngredient", "==", id)
      .get()
      .then((collection) => {
        let docId;
        collection.forEach((doc) => (docId = doc.id));
        return docId;
      });
  };

  //Obtenemos la data del ingrediente seleccionado
  const findDataIngredient = async (id) => {
    return db
      .collection("foodList")
      .where("idUser", "==", getCurrentUser().uid)
      .where("idIngredient", "==", id)
      .get()
      .then((collection) => {
        let dataIngredient;
        collection.forEach((doc) => (dataIngredient = doc.data()));
        return dataIngredient;
      });
  };

  //seleccionar o deseleccionar un alimento en concreto de la lista
  const onchecked = async (id) => {
    const docDataIngredient = await findDataIngredient(id);
    const valueChecked = docDataIngredient.checked;

    if (valueChecked == true) {
      const docId = await findDocId(id);
      const updateCheck = await updateDocument("foodList", docId, {
        checked: false,
      });
      if (updateCheck.statusResponse) {
        const response2 = await getMyIngredients();
        setMyFoodList(response2.myIngredients);
        const response3 = await getTrueIngredients();
        setIngredientsTrue(response3);
      }
    } else {
      const docId = await findDocId(id);
      const updateCheck = await updateDocument("foodList", docId, {
        checked: true,
      });
      if (updateCheck.statusResponse) {
        const response2 = await getMyIngredients();
        setMyFoodList(response2.myIngredients);
        const response3 = await getTrueIngredients();
        setIngredientsTrue(response3);
      }
    }
  };

  //Eliminar ingrediente de la lista
  const deleteIngredientFoodList = async (idIngredient) => {
    const result = { statusResponse: true, error: null };
    try {
      const response = await db
        .collection("foodList")
        .where("idIngredient", "==", idIngredient)
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      response.forEach(async (doc) => {
        const ingListId = doc.id;
        await db.collection("foodList").doc(ingListId).delete();
      });
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    if (result.statusResponse) {
      setLoading(true);
      const response2 = await getMyIngredients();
      setMyFoodList(response2.myIngredients);
      setMyFoodListNames(response2.myIngredientsName);
      setLoading(false);
    }
    return result;
  };

  //Eliminar toda la lista de ingredientes
  const deleteAllFoodList = async () => {
    const result = { statusResponse: true, error: null };
    try {
      const response = await db
        .collection("foodList")
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      response.forEach(async (doc) => {
        const ingListId = doc.id;
        await db.collection("foodList").doc(ingListId).delete();
      });
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    if (result.statusResponse) {
      setLoading(true);
      const response2 = await getMyIngredients();
      setMyFoodList(response2.myIngredients);
      setMyFoodListNames(response2.myIngredientsName);
      setLoading(false);
    }
    return result;
  };

  //SEARCHBAR
  //encontrar en la coleccion de ingredientes el que pasamos por parametros
  const findFoodId = async (name) => {
    const result = [];
    const ingDoc = await db
      .collection("ingredients")
      .where("name", "==", name)
      .get();
    await Promise.all(
      map(ingDoc.docs, async (doc) => {
        result.push(doc.id);
      })
    );
    return result;
  };

  //Primero comprobamos que el ingrediente que queremos añadir no esté ya en la lista
  const validateData = (name) => {
    let isValid = true;

    if (myFoodListNames.includes(name)) {
      alertIngredientRepeat();
      isValid = false;
    }
    return isValid;
  };

  //añadimos el ingrediente a mi foodList
  const addIngredient = async (name) => {
    if (!validateData(name)) {
      return;
    } else {
      setLoading(true);
      const docIdColum = await findFoodId(name);

      const response = await db
        .collection("ingredients")
        .doc(docIdColum[0])
        .get();
      const nameMyIngredient = response.data();

      const addIngredient = await addDocumentWithoutId("foodList", {
        idUser: getCurrentUser().uid,
        idIngredient: docIdColum[0],
        checked: false,
        name: nameMyIngredient.name,
      });

      if (addIngredient.statusResponse) {
        const response2 = await getMyIngredients();
        setMyFoodList(response2.myIngredients);
        setMyFoodListNames(response2.myIngredientsName);
      }
      setLoading(false);
    }
  };

  const alertDeleteFoodList = () =>
    Alert.alert(
      "Alert Message",
      "Are you sure you want to remove all the ingredients from your food list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteAllFoodList() },
      ]
    );

  const alertIngredientRepeat = () =>
    Alert.alert(
      "Alert Message",
      "This ingredient has already been added to the list before.",
      [{ text: "OK" }]
    );

  const createTwoButtonAlert = () =>
    Alert.alert("Alert Message", "You must choose at least one ingredient", [
      { text: "OK" },
    ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ padding: SIZES.padding * 3 }}>
          <View
            style={{
              backgroundColor: "#CEC544",
              borderBottomRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              marginBottom: 5,
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
              Food List
            </Text>
          </View>
        </View>
        <View>
          <Input
            containerStyle={styles.input}
            placeholder="Search an ingredient..."
            placeholderTextColor="#000000"
            onChangeText={onSearch}
            rightIcon={
              <Icon
                type="material-community"
                name="camera"
                color="#000000"
                onPress={() => navigation.navigate("CameraView")}
              />
            }
          />
        </View>
        <View style={styles.switch}>
          <Text>Add pantry ingredients</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={{ paddingBottom: 280, paddingTop: 45 }}>
          <ScrollView>
            <FlatList
              data={myFoodList}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                padding: 20,
                height: "100%",
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    padding: 20,
                    marginBottom: 20,
                    backgroundColor: "#FDEDEC",
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
                      onchecked(item.idIngredient);
                    }}
                  />
                  <View>
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
                  </View>
                  <Icon
                    style={{ right: 0 }}
                    type="material-comunity"
                    name="delete-forever"
                    color="#AA1408"
                    onPress={() => deleteIngredientFoodList(item.idIngredient)}
                  />
                </View>
              )}
            />
            <Loading isVisible={loading} text="Please wait..." />
          </ScrollView>
        </View>

        {searching && (
          <TouchableOpacity
            onPress={() => setSearching(false)}
            style={styles.containerBar}
          >
            <View style={styles.subContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "90%" }}
              >
                {filtered.length ? (
                  filtered.map((item) => {
                    return (
                      <View style={styles.itemView}>
                        <Text
                          style={styles.itemText}
                          onPress={() => addIngredient(item)}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.noResultView}>
                    <Text style={styles.noResultText}>
                      No search items matched
                    </Text>
                  </View>
                )}
                <Loading isVisible={loading} text="Please wait..." />
              </ScrollView>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <FAB
        style={styles.fab}
        large
        icon="magnify"
        onPress={
          ingredientsTrue.length == 0
            ? createTwoButtonAlert
            : () => navigation.navigate("SuggestedRecipes", isEnabled)
        }
      ></FAB>
      <FAB
        style={styles.fab2}
        large
        icon="delete"
        onPress={() => alertDeleteFoodList()}
      ></FAB>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#EEE9E9",
    width: "80%",
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  containerBar: {
    position: "absolute",
    top: "12%",
    left: 0,
    right: 0,
    bottom: 0,
  },
  subContainer: {
    backgroundColor: "#88a1f7",
    paddingTop: 10,
    marginHorizontal: 40,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexWrap: "wrap",
    height: 300,

    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 81,
  },
  itemView: {
    backgroundColor: "white",
    height: 30,
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    borderRadius: 4,
  },
  itemText: {
    color: "black",
    paddingHorizontal: 10,
  },
  noResultView: {
    alignSelf: "center",
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  noResultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    marginBottom: 120,
    bottom: 0,
  },
  fab2: {
    position: "absolute",
    margin: 16,
    right: 0,
    marginBottom: 55,
    bottom: 0,
  },
  switch: {
    flex: 1,
    marginTop: 35,
    alignItems: "center",
  },
  containerCamera: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});