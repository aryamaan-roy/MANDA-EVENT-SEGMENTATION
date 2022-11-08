import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// const firebaseConfig = {
//   apiKey: 'AIzaSyDELtExiZMxa_9BmlrObz56lxcTugL30mI',
//   authDomain: 'portal-93461.firebaseapp.com',
//   projectId: 'portal-93461',
//   storageBucket: 'portal-93461.appspot.com',
//   messagingSenderId: '760536690043',
//   appId: '1:760536690043:web:f9c7a321c909985e47a1de',
//   measurementId: 'G-18DQBTQY7L',
// }

const firebaseConfig = {
  apiKey: "AIzaSyCLqz6dI6Aep749RZSCeRzFrMDG8wbjHFo",
  authDomain: "event-segmentation-manda.firebaseapp.com",
  projectId: "event-segmentation-manda",
  storageBucket: "event-segmentation-manda.appspot.com",
  messagingSenderId: "591383835724",
  appId: "1:591383835724:web:0669b62b84382eaf1970e9",
  measurementId: "G-6RGZ2198W5"
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
// const storageRef = firebase.storage.ref()
const db = firebase.firestore()

export { storage, app }
export default db
