import auth, { app } from "./firebase.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const logoutBtn = document.querySelector("#logout");
const productContainer = document.querySelector("#product-container");
const loadingSpinner = document.querySelector("#loading-spinner");
const notyf = new Notyf();
const navDesktop = document.querySelector("#nav")
const navMobile = document.querySelector("#nav2")
const adminUID = "Mxim2eQnCGbE6HFFkcAlGDl4hlP2";
const logout = async () => {
    try {
        await signOut(auth);
        console.log("User successfully logged out");
        history.replaceState(null, "", "login.html");
        window.location.replace("login.html");
    } catch (error) {
        console.error("Logout error:", error.message);
    }
};
logoutBtn?.addEventListener("click", logout);


const addAdminLink = (navUl) => {
    if (!navUl.querySelector("#adminLink")) {
        const adminLi = document.createElement("li");
        adminLi.id = "adminLink";
        adminLi.className = "px-3 py-2 dark:bg-red-600 bg-red-500 text-white rounded-md cursor-pointer";
        adminLi.innerHTML = `<a href="admin.html">Admin</a>`;
        navUl.appendChild(adminLi);
    }
};

const removeAdminLink = () => {
    document.querySelector("#adminLink")?.remove();
};

onAuthStateChanged(auth, (user) => {
    if (user && user.uid === adminUID) {
        addAdminLink(navDesktop);
        addAdminLink(navMobile);
    } else {
        removeAdminLink();
    }
});


// TO FETCH PRODUCTS FROM FIREBASE FIRESTORE
const db = getFirestore(app);
const fetchProducts = async () => {
    const productsArr = [];
    try {
        if (loadingSpinner) loadingSpinner.classList.remove("hidden");
        if (productContainer) productContainer.classList.add("hidden");
        const querySnapshot = await getDocs(collection(db, "Products"));
        querySnapshot.forEach((prod) => productsArr.push(prod.data()));
    } catch (error) {
        console.log(error);
    } finally {
        if (loadingSpinner) loadingSpinner.classList.add("hidden");
        if (productContainer) productContainer.classList.remove("hidden");
    }
    return productsArr;
}

const getCart = () => JSON.parse(localStorage.getItem("cartLS")) || [];
const getFavourites = () => JSON.parse(localStorage.getItem("favourites")) || [];

if (productContainer) {
    const renderProducts = async () => {
        const products = await fetchProducts();
        const cart = getCart();
        const favourites = getFavourites();
        productContainer.innerHTML = "";

        products.forEach((product) => {
            const { id, name, price, description, url } = product;
            const isInCart = cart.some((item) => item.id === id);
            const isInFav = favourites.some((item) => item.id === id);

            productContainer.innerHTML += `
            <div id=${id} class="justify-between rounded-xl dark:bg-dark_secondary dark:border-secondary bg-primary2 border-primary border-[3px] flex p-4 flex-col gap-4 dark:text-white text-black ">
                <img src=${url} alt=${name} class="w-full rounded-xl">
                <div class="flex items-stretch justify-between">
                    <p class="text-lg font-medium">${name}</p>
                    <p class="text-lg px-2 h-7 text-white dark:bg-secondary rounded-lg bg-primary">$${price}</p>
                </div>
                <p>${description}</p>
                <div class="flex items-center justify-between">
                    <button onclick="addToCart('${id}')" id="cartBtn-${id}" 
                        class="border-2 dark:border-secondary border-primary hover:dark:bg-secondary hover:bg-primary hover:text-white flex px-3 py-2 rounded-md gap-3 items-center transition-colors 
                        ${isInCart ? 'dark:bg-secondary bg-primary text-white' : ''}" 
                        ${isInCart ? "disabled" : ""}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="dark:stroke-white hover:stroke-white stroke-black" width="20" height="20" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="10" cy="20.5" r="1"/>
                            <circle cx="18" cy="20.5" r="1"/>
                            <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                        </svg>
                        ${isInCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                    <button  onclick="addToFavourites('${id}')" id="favBtn-${id}" class="border-2 px-2 py-2 rounded-full dark:border-secondary border-primary" title="add to favourites">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-pink-600 hover:fill-pink-600 transition-colors ${isInFav ? "fill-pink-600" : ""}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>`;
        });
    };
    renderProducts();
}


const addToCart = async (productId) => {
    let cart = getCart();
    const products = await fetchProducts();
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct && !cart.some((item) => item.id === productId)) {
        cart.push(selectedProduct);
        localStorage.setItem("cartLS", JSON.stringify(cart));

        const button = document.querySelector(`#cartBtn-${productId}`);
        if (button) {
            button.innerText = "Added to Cart";
            button.classList.add("dark:bg-secondary", "bg-primary", "text-white");
            button.disabled = true;
        }

        notyf.success("Added to Cart!");
        console.log(getCart());
    }
};

const addToFavourites = async (productId) => {
    let favourites = getFavourites();
    const products = await fetchProducts();
    const selectedProduct = products.find((product) => product.id === productId);

    if (selectedProduct && !favourites.some((item) => item.id === productId)) {
        favourites.push(selectedProduct);
        localStorage.setItem("favourites", JSON.stringify(favourites));

        const button = document.querySelector(`#favBtn-${productId} svg`);
        if (button) {
            button.classList.add("fill-pink-600");
        }

        notyf.success("Added to Favourites!");
        console.log(getFavourites());
    }
};

window.addToCart = addToCart;
window.addToFavourites = addToFavourites;
