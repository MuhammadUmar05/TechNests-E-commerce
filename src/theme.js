document.addEventListener("DOMContentLoaded", () => {
    const HTML = document.documentElement;
    const modeButton = document.querySelector(".mode");
    const moon = document.querySelector(".moon");
    const sun = document.querySelector(".sun");

    const isDarkMode = localStorage.getItem("current-mode") === "dark";
    
    if (isDarkMode) {
        HTML.classList.add("dark");
        moon.classList.remove("hidden");
        sun.classList.add("hidden");
    } else {
        HTML.classList.remove("dark");
        moon.classList.add("hidden");
        sun.classList.remove("hidden");
    }

    if (modeButton) {
        modeButton.addEventListener("click", () => {
            const isDark = HTML.classList.toggle("dark");

            moon.classList.toggle("hidden", !isDark);
            sun.classList.toggle("hidden", isDark);

            localStorage.setItem("current-mode", isDark ? "dark" : "light");
        });
    }
});
