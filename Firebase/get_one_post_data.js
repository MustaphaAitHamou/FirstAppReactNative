import app from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

const db = getFirestore(app);

export const getOnePostData = async (id) => {
    const docRef = doc (db, "post", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        console.log("Document.data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such document !");
    }
}