// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKIpAMAvpkRtY5Tk-HFTUF6s_U-XPMUkY",

  authDomain: "vote-5f037.firebaseapp.com",

  projectId: "vote-5f037",

  storageBucket: "vote-5f037.appspot.com",

  messagingSenderId: "443160307607",

  appId: "1:443160307607:web:216fdb9fbe9544725f86d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
