import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDduFQLA69XPLy_1hb7Z9flz3q3jkOKQTQ",
    authDomain: "crwn-db-873ea.firebaseapp.com",
    projectId: "crwn-db-873ea",
    storageBucket: "crwn-db-873ea.appspot.com",
    messagingSenderId: "106413454908",
    appId: "1:106413454908:web:6d42c5415e1e33cab4f539"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()

    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc()

        batch.set(newDocRef, obj)
    })

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    console.log(collections, '<<doc')

    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            items,
            title,
        }

    })

    return transformedCollections.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;






