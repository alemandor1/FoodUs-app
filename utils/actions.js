import {firebaseApp} from "./firebase"
import firebase from 'firebase'
import 'firebase/firebase-firestore'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}