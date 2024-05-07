import app from "../firebaseConfig";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth(app);

export const loginWithPhoneNumber = async (phoneNumber) => {
    window.RecaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            console.log("recaptcha allowed")
            console.log(response)
        },
        'expired-callback': ()=> {
            console.log("recaptcha not allowed")
            console.log(response)
        }
    });
    const appVerifier = window.RecaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult)
        return confirmationResult;
    }).catch((error) => {
        console.log("SMS not sent")
        console.log(error)
    })
}