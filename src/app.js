import auth, { app } from "./firebase.js";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { nanoid } from "https://cdnjs.cloudflare.com/ajax/libs/nanoid/5.0.9/index.browser.js"

const form = document.querySelector("#signup-form");
const notyf = new Notyf();
const signUp = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        window.location.replace("home-page.html");
        console.log("User signed up:", user);
    } catch (error) {
        console.error("Signup error:", error.code, error.message);
    }
};

form?.addEventListener("submit", signUp);


document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        const currentPage = window.location.pathname.split("/").pop();

        if (user && (currentPage === "index.html" || currentPage === "login.html")) {
            history.replaceState(null, "", "home-page.html");
            window.location.replace("home-page.html");
        } else {
            console.log("User not logged in or already on a valid page.");
        }
    });
});

const login = document.querySelector("#login");
if (login) {
    login.addEventListener("click", () => {
        history.replaceState(null, "", "login.html");
        window.location.replace("login.html");
    })
}


// admin user page
const db = getFirestore(app)
const addProduct = async (e) => {
    e.preventDefault()
    const name = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const price = Number(document.querySelector("#price").value);
    const url = document.querySelector("#image").value;
    const id = nanoid();
    try {
        await addDoc(collection(db, 'Products'), {
            id,
            name,
            description,
            price,
            url,
            amount: 1
        })
        notyf.success("Product added successfully");
        document.querySelector("#admin-form").reset();
    } catch (error) {
        console.log(error)
    }
}
document.querySelector("#admin-form")?.addEventListener("submit", addProduct)

