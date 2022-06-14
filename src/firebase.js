import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  collectionGroup,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDXv15Fp9GwpSlpsQ9bf5CB11ito6BK3vw',
  authDomain: 'notes-app-9bd05.firebaseapp.com',
  projectId: 'notes-app-9bd05',
  storageBucket: 'notes-app-9bd05.appspot.com',
  messagingSenderId: '822063712843',
  appId: '1:822063712843:web:ce1e2d705ac1799b139bce',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const userCollectionRef = collection(db, 'users');
const userDataRef = collection(db, 'userData');

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(userCollectionRef, where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(userCollectionRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw new Error(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const addNote = async (title, note, uid) => {
  try {
    const saveNote = {
      title: title,
      note: note,
      uid: uid,
      isArchived: false,
      isTrashed: false,
    };
    const notesRef = collection(userDataRef, uid, 'notes');
    await setDoc(doc(notesRef), saveNote);
  } catch (err) {
    throw new Error(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw new Error(err.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err.message);
  }
};

export {
  auth,
  db,
  addNote,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
