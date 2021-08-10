import firebase from "firebase"
// public firebase client config
const firebaseConfig = {
    apiKey: "AIzaSyC_gnQiWk9G9G0fHkjORYoKjlUhtPHv-PA",
    authDomain: "pharmacie-de-garde-05.firebaseapp.com",
    databaseURL: "https://pharmacie-de-garde-05-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pharmacie-de-garde-05",
    storageBucket: "pharmacie-de-garde-05.appspot.com",
    messagingSenderId: "721511039437",
    appId: "1:721511039437:web:079caa53bcd21b9dc88484"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase.app()