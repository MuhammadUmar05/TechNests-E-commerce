const favouriteContainer = document.querySelector("#favourite-container");
const getFavourites = () => JSON.parse(localStorage.getItem("favourites")) || [];
const favourites = getFavourites();
const notyf = new Notyf();
const renderFavourites = () => {
    const favourites = getFavourites();
    favouriteContainer.innerHTML = "";
    favourites.forEach((fav) => {
        const { id, name, price, description, url } = fav;
        favouriteContainer.innerHTML += `
        <div id=${id} class="justify-between rounded-xl dark:bg-dark_secondary dark:border-secondary bg-primary2 border-primary border-[3px] flex p-4 flex-col gap-4 dark:text-white text-black ">
            <img src=${url} alt=${name} class="w-full rounded-xl">
            <div class="flex items-stretch justify-between">
                <p class="text-lg font-medium">${name}</p>
                <p class="text-lg px-2 h-7 text-white dark:bg-secondary rounded-lg bg-primary">$${price}</p>
            </div>
            <p>${description}</p>
            <div class="flex items-center justify-between">
                <button class="border-2 px-2 py-2 rounded-full dark:border-secondary border-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-pink-600 fill-pink-600 transition-colors" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="butt" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <button onclick="deleteFav('${id}')" id="favBtn-${id}" class="border-2 dark:border-secondary border-primary hover:dark:bg-secondary hover:bg-primary hover:text-white flex px-3 py-2 rounded-md gap-3 items-center transition-colors">
                   Remove favourite
                </button>
            </div>
        </div>`;
    });
    if (favourites.length === 0) {
        favouriteContainer.innerHTML = "<p class='text-center text-xl col-span-full'>NOTHING TO SHOW</p>"
    }
};

const deleteFav = (favId) => {
    let favourites = getFavourites();
    favourites = favourites.filter((favourite) => favourite.id !== favId);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    notyf.success("Favourites updated");
    renderFavourites()
};
window.deleteFav = deleteFav;

renderFavourites()
