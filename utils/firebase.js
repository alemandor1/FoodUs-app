import firebase from 'firebase'
import 'firebase/firebase-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAzONd4o8YcuMWUgiAINl6jWws-YxJ5vq0",
    authDomain: "foodustfg-2e598.firebaseapp.com",
    projectId: "foodustfg-2e598",
    storageBucket: "foodustfg-2e598.appspot.com",
    messagingSenderId: "864240287076",
    appId: "1:864240287076:web:c97a126f83e614fdfa0e71"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)