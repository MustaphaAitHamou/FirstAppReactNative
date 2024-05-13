import "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

const auth = getAuth();

export const signin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      console.log("signin success");
      router.navigate('/profile');
      showToast("Connexion réussie !");      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      showToast("Erreur de connexion : " + errorMessage);
    });    
};
const showToast = (message) => {
  const toaster = document.getElementById("toaster");
  if (toaster) {
    toaster.innerText = message;
    toaster.classList.add("show");
    setTimeout(() => {
      toaster.classList.remove("show");
    }, 3000); // Affichage du toaster pendant 3 secondes
  }
};
