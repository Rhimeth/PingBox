import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBn-OmvczuyTN64pU28rHCX4bbv17rZEGY',
  authDomain: 'pingbox-7f084.firebaseapp.com',
  projectId: 'pingbox-7f084',
  storageBucket: 'pingbox-7f084.appspot.com',
  messagingSenderId: '1021746125295',
  appId: '1:1021746125295:web:a2a548beb173b854727e1a',
  measurementId: 'G-13QF154790'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
