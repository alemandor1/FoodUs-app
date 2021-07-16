import { firebaseApp } from "./firebase";
import firebase from "firebase";
import "firebase/firebase-firestore";
import { fileToBlob } from "./helpers";

import { map } from 'lodash'

const db = firebase.firestore(firebaseApp);

export const isUserLogged = () => {
  let isLogged = false;
  firebase.auth().onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });
  return isLogged;
}

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
}

export const getUser = () => {
  return firebase.auth().currentUser.displayName;
}

export const closeSession = () => {
  return firebase.auth().signOut();
}

export const registerUser = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email,
          });
      });
  } catch (error) {
    result.statusResponse = false;
    result.error = "Este correo ya ha sido registrado.";
  }
  return result;
}

export const loginWithEmailAndPassword = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Usuario o contraseña no válidos.";
  }
  return result;
}

export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };
  const ref = firebase.storage().ref(path).child(name);
  const blob = await fileToBlob(image);

  try {
    await ref.put(blob);
    const url = await firebase
      .storage()
      .ref(`${path}/${name}`)
      .getDownloadURL();
    result.statusResponse = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
}

export const updateProfile = async (data) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateProfile(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
}

export const reauthenticate = async (password) => {
  const result = { statusResponse: true, error: null };
  const user = getCurrentUser();
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  try {
    await user.reauthenticateWithCredential(credentials);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
}

export const updateEmail = async (email) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase
      .auth()
      .currentUser.updateEmail(email)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            email,
          });
      });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
}

export const updatePassword = async (password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updatePassword(password);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
}

export const deleteFavorite = async (idRecipe) => {
  const result = { statusResponse: true, error: null };
  try {
    const response = await db
      .collection("favourites")
      .where("idRecipe", "==", idRecipe)
      .where("idUser", "==", getCurrentUser().uid)
      .get();
    response.forEach(async (doc) => {
      const favoriteId = doc.id;
      await db.collection("favourites").doc(favoriteId).delete();
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
}

export const addDocumentWithoutId = async (collection, data) => {
  const result = { statusResponse: true, error: null };
  try {
    await db.collection(collection).add(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
}

export const getFavourites = async () => {
  const result = { statusResponse: true, error: null, favourites: [] };
  try {
    const response = await db
      .collection("favourites")
      .where("idUser", "==", getCurrentUser().uid)
      .get()
    await Promise.all(
      map(response.docs, async (doc) => {
        const favourite = doc.data()
        result.favourites.push(favourite)
      })
    )
  } catch (error) {
    result.statusResponse = false
    result.error = error
  }
  return result
}

export const getIsFavorite = async (idRecipe) => {
  const result = { statusResponse: true, error: null, favourite: false };
  try {
    const response = await db
      .collection("favourites")
      .where("idRecipe", "==", idRecipe)
      .where("idUser", "==", getCurrentUser().uid)
      .get();
    result.favourite = response.docs.length > 0;
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
}

export const addDocumentWithId = async(collection, data, doc) => {
  const result = { statusResponse: true, error: null }
  try {
      await db.collection(collection).doc(doc).set(data)
  } catch (error) {
      result.statusResponse = false
      result.error = error
  }
  return result     
}
