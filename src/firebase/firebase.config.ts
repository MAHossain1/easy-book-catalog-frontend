import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqLTyjHIl42nIQdQws7OIltkx64I9nF4Y",
  authDomain: "easy-book-catalog.firebaseapp.com",
  projectId: "easy-book-catalog",
  storageBucket: "easy-book-catalog.appspot.com",
  messagingSenderId: "659085782920",
  appId: "1:659085782920:web:b43cab3af2d8dd54c4543d",
};

// Initialize Firebase

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const auth = getAuth(app);
