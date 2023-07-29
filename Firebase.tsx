// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, getDoc, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore"
import { doc } from "firebase/firestore";
import { User, getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getStorage, ref } from "firebase/storage"
import { useEffect, useState, useContext, createContext, use } from "react";
import { Message } from "ai";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0ki-tmK4LD64ZB9_lmFKEYUZ7EK8-70s",
    authDomain: "vocalverse-cb21a.firebaseapp.com",
    projectId: "vocalverse-cb21a",
    storageBucket: "vocalverse-cb21a.appspot.com",
    messagingSenderId: "511815226312",
    appId: "1:511815226312:web:ccace8c663882353aa66fd",
    measurementId: "G-W3YJVK3WY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

isSupported().then((isSupported) => {
    if (isSupported) {
        // initializeApp() previously called
        const analytics = getAnalytics(app);
    } else {
        // IDK
    }
}
);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export const db = getFirestore(app);
export const usersRef = collection(db, "users")
export const modelsRef = collection(db, "models")
export const chatsRef = collection(db, "chats")

export const storage = getStorage(app)
export const usersStorageRef = ref(storage, "users")
export const modelsStorageRef = ref(storage, "models")
export const chatsStorageRef = ref(storage, "chats")



export function useAuth() {

    const [signedIn, setSignedIn] = useState<boolean | null>()
    const [user, setUser] = useState<User | null>()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
                setSignedIn(true)
                setUser(u)
            } else {
                setSignedIn(false)
                setUser(null)
            }
        })

        return unsubscribe
    }, [auth])

    return { signedIn, user }

}
const checkAndAddUserToFireStore = (user: User, models = ["gb2LF0RRGYgAO1TD7hyM"], chats = []) => {
    const uid = user.uid;
    const email = user.email;
    const firstName = user.displayName?.split(' ')[0];
    const lastName = user.displayName?.split(' ')[1];
    const photoUrl = user.photoURL;

    getDoc(doc(db, "users", uid)).then((d) => {
        if (d.exists()) {
            console.log("User already exists")
        } else {
            setDoc(doc(db, "users", uid), {
                uid: uid,
                email: email,
                firstName: firstName,
                lastName: lastName,
                photoUrl: photoUrl,
                models: models,
                chats: chats,
            })
        }
    })
}

export const checkAndAddChatToFireStore = async (uid: string, modelId: string, messages: Message[] = []) => {
    let chatId = uid + modelId
    getDoc(doc(db, "chats", chatId)).then(async (d) => {
        if (d.exists()) {
            console.log("Chat already exists")
        } else {
            await setDoc(doc(db, "chats", chatId), {
                uid: uid,
                modelId: modelId,
            })
            messages.slice(1).map(async (message) => {
                await addDoc(collection(db, `chats/${chatId}/messages`), message)
            })

        }
    })
}

export async function deleteCollection(path: string) {
    const querySnapshot = await getDocs(collection(db, path));
    querySnapshot.forEach((d) => {
        // doc.data() is never undefined for query doc snapshots
        const docRef = doc(db, path, d.id);
        deleteDoc(docRef);
    });
}

export const signInWithGoogle = () => {
    console.log("button clicked")
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)

            checkAndAddUserToFireStore(user)

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

export const addMessageToChat = async (chatId: string, messageId: string, message: Message) => {
    await setDoc(doc(db, `chats/${chatId}/messages`, messageId), message)
}
/* const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
}

const AuthContext = createContext({})
export const AuthContextProvider = ({ children }: { children: any }) => {

    return <AuthContext.Provider value={googleSignIn}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext) */

export async function getAllDocs(collection: string) {
    switch (collection) {
        case "users":
            return await getDocs(usersRef)
        case "models":
            return await getDocs(modelsRef)
        case "chats":
            return await getDocs(chatsRef)
        default:
            new Error("Invalid collection")
    }
}

export async function getDocById(collection: string, id: string) {
    switch (collection) {
        case "users":
            return await getDoc(doc(usersRef, id))
        case "models":
            return await getDoc(doc(modelsRef, id))
        case "chats":
            return await getDoc(doc(chatsRef, id))
        default:
            throw new Error("Invalid collection")
    }
}

export async function getUserChats(userId: string) {
    let userData = await getDocById("users", userId)
    let chatsIdArray = userData?.data()?.chats
    let chatsArray = []
    for (let i = 0; i < chatsIdArray.length; i++) {
        let chat = await getDocById("chats", chatsIdArray[i])
        chatsArray.push(chat?.data())
    }
    return chatsArray
}

export async function getUserModels(userId: string) {
    let userData = await getDocById("users", userId)
    let modelsIdArray = userData?.data()?.models
    let modelsArray = []
    for (let i = 0; i < modelsIdArray.length; i++) {
        let model = await getDocById("models", modelsIdArray[i])
        modelsArray.push(model?.data())
    }
    return modelsArray
}