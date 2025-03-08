import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDRLLaNWLm_BJMtIy3rwkDZ7QgVmwJ-9uM",
    authDomain: "technests-afe83.firebaseapp.com",
    projectId: "technests-afe83",
    storageBucket: "technests-afe83.firebasestorage.app",
    messagingSenderId: "539283454170",
    appId: "1:539283454170:web:2ee626fe9aa27f52e24de3"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth