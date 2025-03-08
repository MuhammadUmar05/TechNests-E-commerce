import auth from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const form = document.querySelector("form");

const signIn = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        history.replaceState(null, "", "home-page.html");
        window.location.replace("home-page.html");
    } catch (error) {
        if (error) {
            document.querySelector(".error").innerText = "Incorrect email or password. Try again"
        }
        console.error("Signup error:", error.code, error.message);
    }
};

form?.addEventListener("submit", signIn);

const signUp = document.querySelector("#signUp");
if (signUp) {
    signUp.addEventListener("click", () => {
        history.replaceState(null, "", "index.html");
        window.location.replace("index.html");
    })
}
