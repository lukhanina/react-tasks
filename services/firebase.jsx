import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBulbMO9ke2VxtKHPMO809hiu-cz76fr18",
  authDomain: "gb-firebase-1b484.firebaseapp.com",
  projectId: "gb-firebase-1b484",
  storageBucket: "gb-firebase-1b484.appspot.com",
  messagingSenderId: "108978929084",
  appId: "1:108978929084:web:6405b9a0b83ef363483fb9"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const signUp = async (email, password) => await createUserWithEmailAndPassword(firebaseAuth, email, password)

export const signIn = async (email, password) => await signInWithEmailAndPassword(firebaseAuth, email, password)

export const logOut = async () => await signOut(firebaseAuth)

export const db = getDatabase(app)

export const userRef = ref(db, 'user')
export const chatsRef = ref(db, 'chats')

export const getChatById = (chatId) => ref(db, `chats/${chatId}`)
