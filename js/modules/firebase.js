/* Importing the firebase libraries. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import { FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "./variables.js";

/* The configuration of the firebase project. */
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

/* Initializing the firebase app and getting the firestore database. */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Setting the language of the sign in popup to Spanish. */
const provider = new GoogleAuthProvider();
export const auth = getAuth();
auth.languageCode = 'es';

/**
 * The login function is an async function that calls the signInWithPopup function from the firebase
 * library, which returns a promise. The promise is then resolved and the user object is returned.
 * @returns The result of the getData function.
 */
export async function login() {
    try {
        const result = await signInWithPopup(auth,provider);
        const user = result.user;
        return await getData(user);
        
    } catch (e) {
        console.error(e);
    }
}

/**
 * It's a function that logs out the user from the app
 */
export function logout(){
    signOut(auth).then(() => {
    })
}

/**
 * It takes in a user's uid, username, email, and photoURL, and then creates a new document in the
 * users collection with the user's uid as the document id, and the username, email, and photoURL as
 * the document fields.
 * @param uid - uid,
 * @param username - "John Doe"
 * @param email - email,
 * @param photoURL -
 */
export async function saveProfile(uid, username, email, photoURL) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            uid: uid,
            username: username,
            email: email,
            photoURL: photoURL,
            work: {
                dailyTime: 0,
                weeklyTime: 0,
                monthlyTime: 0
            },
            play: {
                dailyTime: 0,
                weeklyTime: 0,
                monthlyTime: 0
            },
            study: {
                dailyTime: 0,
                weeklyTime: 0,
                monthlyTime: 0
            },
            exercise: {
                dailyTime: 0,
                weeklyTime: 0,
                monthlyTime: 0
            },
            social: {
                dailyTime: 0,
                weeklyTime: 0,
                monthlyTime: 0
            },
            selfCare: {
                dailyTime: 0,
                weeklyTime: 0,
                monthlyTime: 0
            }
        });
    } catch (e) {
        console.error("Hubo un error al registrar usuario.");
    }
}

/**
 * If the user is not in the database, add them. If they are, return their data.
 * @param user - The user object returned from the Firebase authentication.
 * @returns The user object.
 */
export async function getData(user){

    const q = query(collection(db,"users"), where("uid", "==", user.uid));

    let results = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        results.push(doc.data());
    });

    if(results.length == 0){
        saveProfile(user.uid, user.displayName, user.email, user.photoURL);
        return user;
    }else{
        return results[0];
    }
}