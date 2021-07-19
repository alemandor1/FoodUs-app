import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Input, Icon, ListItem, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import {
  getDocumentById,
  getCurrentUser,
  addDocumentWithoutId,
  updateDocument,
} from "../../utils/actions";
import firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firebase-firestore";
import { map } from "lodash";
import Loading from "../../components/Loading";

export default function FoodList() {
  const [ingredientsDB, setIngredientsDB] = useState([]);

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
  //const [isSelected, setSelection] = useState(false);

  const getMyIngredients = async () => {
    const result = { statusResponse: true, error: null, myIngredients: [] };
    try {
      const response = await db
        .collection("foodList")
        .where("idUser", "==", getCurrentUser().uid)
        .get();
      //const myIngredientsId = [];
      response.forEach((doc) => {
        const foodData = doc.data();
        result.myIngredients.push(foodData);
      });
      /* await Promise.all(
        map(myIngredientsId, async (idIngredient) => {
          const response2 = await getDocumentById("ingredients", idIngredient);
          if (response2.statusResponse) {
            result.myIngredients.push(response2.document);
          }
        })
      ); */
    } catch (error) {
      result.statusResponse = false;
      result.error = error;
    }
    return result;
  };

  const [myFoodList, setMyFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getMyIngredients();
        setMyFoodList(response.myIngredients);
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
      .where("idIngredient", "==", id)
      .get()
      .then((collection) => {
        let dataIngredient;
        collection.forEach((doc) => (dataIngredient = doc.data()));
        return dataIngredient;
      });
  };

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
      }
    } else {
      const docId = await findDocId(id);
      const updateCheck = await updateDocument("foodList", docId, {
        checked: true,
      });
      if (updateCheck.statusResponse) {
        const response2 = await getMyIngredients();
        setMyFoodList(response2.myIngredients);
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
  //añadimos el ingrediente a mi lista de ingredientes
  const addIngredient = async (name) => {
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
    }
    setLoading(false);
  };

  //Obtenemos los ingredientes que tengan el valor checked == true
  const getTrueIngredients = async () => {
    const trueIngredients = [];

    const response = await db
      .collection("foodList")
      .where("idUser", "==", getCurrentUser().uid)
      .where("checked", "==", true)
      .get();
    response.forEach((doc) => {
      const foodData = doc.data();
      trueIngredients.push(foodData.name);
    });

    console.log(trueIngredients)

    Alert.alert("Listado de ingredientes", "patataaaaaaaaaaaaaaaaaaaaaa", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View>
      <View style={styles.container}>
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
              //onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {/* LISTADO DE INGREDIENTES */}
        <View style={styles.viewBody}>
          <ScrollView>
            {myFoodList.map((item) => {
              return (
                <ListItem key={item.id} bottomDivider>
                  <View style={styles.containerList}>
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        value={item.checked}
                        onValueChange={() => {
                          onchecked(item.idIngredient);
                        }}
                        style={styles.checkbox}
                      />
                    </View>
                  </View>
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                  </ListItem.Content>
                  <Icon
                    type="material-comunity"
                    name="delete-forever"
                    color="#AA1408"
                    onPress={() => deleteIngredientFoodList(item.id)}
                  />
                </ListItem>
              );
            })}
            <Button
              title="Daaaaaaaaaaale"
              onPress={() => getTrueIngredients()}
            ></Button>
          </ScrollView>
          <Loading isVisible={loading} text="Por favor espere..." />
        </View>
      </View>
      {/* SEARCHBAR */}
      {searching && (
        //<SearchBar onPress={() => setSearching(false)} ings={filtered} />
        <TouchableOpacity
          onPress={() => setSearching(false)}
          style={styles.containerBar}
        >
          <View style={styles.subContainer}>
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
                <Text style={styles.noResultText}>No search items matched</Text>
              </View>
            )}
            <Loading isVisible={loading} text="Por favor espere..." />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "20%",
    flex: 1,
  },
  input: {
    backgroundColor: "#BFBFBF",
    width: "80%",
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  viewFavorite: {
    flex: 1,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
  },
  viewBody: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    marginTop: 20,
  },
  containerBar: {
    position: "absolute",
    top: "11.2%",
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

    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 81,
  },
  itemView: {
    backgroundColor: "white",
    height: 30,
    width: "90%",
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
  containerList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});
