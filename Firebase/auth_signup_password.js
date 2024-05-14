import "../firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

const auth = getAuth();
export const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            console.log("signup success");
            router.navigate('/profile');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
} 