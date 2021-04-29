import firebase from 'firebase'
import 'firebase/firebase-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDH73_KbavpjtxCjr100ZU-vPKBittQDJI",
    authDomain: "foodus-tfg.firebaseapp.com",
    projectId: "foodus-tfg",
    storageBucket: "foodus-tfg.appspot.com",
    messagingSenderId: "153932292960",
    appId: "1:153932292960:web:c7dd48648dbd7eb31d7405"
}

class Firebase {
    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth()
    }

    login = (email, pass) => {
        return this.auth.signInWithEmailAndPassword(email, pass)
    }

    createUser = async (name, user, pass) => {
        await this.auth.createUserWithEmailAndPassword(user, pass)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    getUser = () => {
        return this.auth.currentUser.displayName
    }
}

const firebaseService = new Firebase()
export default firebaseService