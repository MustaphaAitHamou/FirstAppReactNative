import app from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

export const createPost = async(title, text, createdBy) => {
    try {
        const docRef = await addDoc(collection(db, "post"), {
            title, text,
            date: new Date(),
            createdBy
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}