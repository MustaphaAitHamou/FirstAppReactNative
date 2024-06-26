import "../firebaseConfig";
import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();
export const foo = () => {
  updateProfile(auth.currentUser, {
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg",
  })
    .then(() => {
      // Profile updated!
    })
    .catch((error) => {
      // An error occurred
    });
};
