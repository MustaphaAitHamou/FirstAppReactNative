import app from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

const db = getFirestore(app);

export const getPostData = async () => {
    const querySnapshot = await getDocs(collection(db, "post"));
    let res = querySnapshot.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
    ))
    return res;
}