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
  apiKey: "AIzaSyC2bupy3gsvPEZcc96_5MTXX2eQzW6Cbo8",
  authDomain: "dc-motor-project.firebaseapp.com",
  projectId: "dc-motor-project",
  storageBucket: "dc-motor-project.appspot.com",
  messagingSenderId: "63891369762",
  appId: "1:63891369762:web:c4d6fc2b842fd7d2dbbf7b",
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
// const storageRef = firebase.storage.ref()
const db = firebase.firestore()

export { storage, app }
export default db
