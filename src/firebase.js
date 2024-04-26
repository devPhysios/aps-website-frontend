import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAm4Z56NIByOUNXVreXMLb4JhIoM7WNlGk",
    authDomain: "aps-database-27b6a.firebaseapp.com",
    projectId: "aps-database-27b6a",
    storageBucket: "aps-database-27b6a.appspot.com",
    messagingSenderId: "800921671926",
    appId: "1:800921671926:web:35fa6c4db178bc16acb4d7",
    measurementId: "G-J71QQ6FYZS",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)


const imagesCollectionRef = collection(db, 'images')
// we need export this setuped variables for use in another file
export { storage, imagesCollectionRef, db }