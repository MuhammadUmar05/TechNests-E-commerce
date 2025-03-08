const cartContainer = document.querySelector("#cart-container");
const getCart = () => JSON.parse(localStorage.getItem("cartLS")) || [];
const notyf = new Notyf();
let cart = getCart()

const renderCart = () => {
    const cart = getCart();
    cartContainer.innerHTML = "";

    cart.forEach((item) => {
        const { id, name, price, description, url, amount } = item;
        cartContainer.innerHTML += `
        <article
            class="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
          >
            <img
              src="${url}"
              alt="${name}"
              class="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
            />
            <div class="sm:ml-16 sm:w-48">
              <h3 class="capitalize font-medium">${name}</h3>
              <h4 class="mt-2 capitalize text-sm text-neutral-content tracking-wide">
                ${String(description).slice(0, 16)}...
              </h4>
              <button onclick="deleteItem('${id}')" class="dark:text-secondary text-primary hover:underline">Remove</button>
            </div>
            <div class="flex items-center gap-4">
                <button onclick="decreaseItem('${id}')" class="dark:bg-secondary bg-primary text-white px-2 rounded text-2xl">-</button>
                <p class="text-xl">${amount}</p>
                <button onclick="addItem('${id}')" class="dark:bg-secondary bg-primary text-white px-2 rounded text-2xl">+</button>
            </div>
            <p class="font-medium sm:ml-auto">$${(price * amount).toFixed(2)}</p>
            </article>`;
    });

    updateTotals();
    const paymentBox = document.querySelector("#payment");
    if (cart.length === 0) {
        paymentBox?.classList.add("hidden");
        cartContainer.parentElement.innerHTML = "<p class='text-center text-xl col-span-full'>NOTHING TO SHOW</p>"
    } else {
        paymentBox?.classList.remove("hidden");
    }
};

const deleteItem = (itemId) => {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cartLS", JSON.stringify(cart));
    notyf.success("Cart updated");
    renderCart();
};

const addItem = (itemId) => {
    let cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].amount += 1;
        localStorage.setItem("cartLS", JSON.stringify(cart));
        renderCart();
    }
};

const decreaseItem = (itemId) => {
    let cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
        if (cart[itemIndex].amount > 1) {
            cart[itemIndex].amount -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    localStorage.setItem("cartLS", JSON.stringify(cart));
    renderCart();
};

const updateTotals = () => {
    let total = 0;
    const cart = getCart();

    for (let { price, amount } of cart) {
        total += (price * amount);
    }

    document.querySelector("#sub-total").innerHTML = `$${total.toFixed(2)}`;
    document.querySelector("#tax").innerHTML = `$${(total / 10).toFixed(2)}`;
    document.querySelector("#order-total").innerHTML = `$${(total + total / 10 + 5).toFixed(2)}`;
};

const checkOutBtn = document.querySelector("#check-out");
checkOutBtn.addEventListener("click", () => {
    window.location.replace("checkout.html");
    cart = [];
    localStorage.setItem("cartLS", JSON.stringify(cart));
})

if (cart.length === 0) {
    document.querySelector("#payment").classList.add("hidden")
}


window.deleteItem = deleteItem;
window.addItem = addItem;
window.decreaseItem = decreaseItem;

renderCart();
