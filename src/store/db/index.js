import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyBBJKXMV4uY7i4TGD_7yz_Ohyb4XDEousg',
  authDomain: 'thesis-test-backend.firebaseapp.com',
  databaseURL: 'https://thesis-test-backend.firebaseio.com',
  projectId: 'thesis-test-backend',
  storageBucket: 'gs://thesis-test-backend.appspot.com',
  messagingSenderId: '677426484373',
  appId: '1:677426484373:web:7faf4a6b917c0968'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

// offline cache
db.enablePersistence({ synchronizeTabs: true })

export default db
