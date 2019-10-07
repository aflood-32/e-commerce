import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyChW4CpJZ4fFounW6ei5y5Ak7U805CbtiM",
    authDomain: "crown-db-7160f.firebaseapp.com",
    databaseURL: "https://crown-db-7160f.firebaseio.com",
    projectId: "crown-db-7160f",
    storageBucket: "",
    messagingSenderId: "858972857849",
    appId: "1:858972857849:web:d4fe055ed5f7bf5fbd4928"
};





firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get()

    if(!snapShot.exists){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
                console.log('error creating user', error.message)
        }

    }

    return userRef


}

export default firebase;
