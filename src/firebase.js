import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import 'firebase/compat/auth'
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore/lite';

// const firebaseApp = firebase.initializeApp({
//   apiKey: 'AIzaSyDELtExiZMxa_9BmlrObz56lxcTugL30mI',
//   authDomain: 'portal-93461.firebaseapp.com',
//   projectId: 'portal-93461',
//   storageBucket: 'portal-93461.appspot.com',
//   messagingSenderId: '760536690043',
//   appId: '1:760536690043:web:f9c7a321c909985e47a1de',
//   measurementId: 'G-18DQBTQY7L',
// })

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyC2bupy3gsvPEZcc96_5MTXX2eQzW6Cbo8",
//   authDomain: "dc-motor-project.firebaseapp.com",
//   projectId: "dc-motor-project",
//   storageBucket: "dc-motor-project.appspot.com",
//   messagingSenderId: "63891369762",
//   appId: "1:63891369762:web:c4d6fc2b842fd7d2dbbf7b",
// })

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCLqz6dI6Aep749RZSCeRzFrMDG8wbjHFo",
  authDomain: "event-segmentation-manda.firebaseapp.com",
  projectId: "event-segmentation-manda",
  storageBucket: "event-segmentation-manda.appspot.com",
  messagingSenderId: "591383835724",
  appId: "1:591383835724:web:0669b62b84382eaf1970e9",
  measurementId: "G-6RGZ2198W5"
})
const auth = firebase.auth()
// export default firebase;
// export default getDownloadURL
export { auth, firebase }
