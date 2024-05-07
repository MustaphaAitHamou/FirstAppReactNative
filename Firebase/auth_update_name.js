import app from "../firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth(app);
export const updateUserPhotoUrl = async (name) => {
 try {
 await updateProfile(auth.currentUser, {displayName: name});
 return true;
 } catch (e) { return false;}
}