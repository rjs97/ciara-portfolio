const firebase = require('firebase')
require('firebase/functions')

const config = {
  apiKey: "AIzaSyBHtK-V7_0DbZUBOXP9TwVMhSin5e6-0ZQ",
  authDomain: "ciara-post-portfolio.firebaseapp.com",
  databaseURL: "https://ciara-post-portfolio.firebaseio.com",
  projectId: "ciara-post-portfolio",
  storageBucket: "ciara-post-portfolio.appspot.com",
  messagingSenderId: "741851880877",
  appId: "1:741851880877:web:bdbc0f5f644c449e801524",
  measurementId: "G-CR4BWFTL8K"
}

firebase.initializeApp(config)

export default firebase
