const addBtn = document.querySelector(".add-btn");
const addPopUp = document.querySelector(".add-pop-up");

addBtn.addEventListener("click", (e) => {
    addPopUp.classList.add("active");
});

// Close popup when click is outside
const popup = document.querySelector(".add-pop-up");

function closePopup() {
    popup.classList.toggle("active");
}

// Open/Close drop-down menu
const statusBtn = document.querySelector(".dd-button");
const statusMenu = document.querySelector(".dd-menu");

function toggleMenu() {
    statusMenu.classList.toggle("active");
}
statusBtn.addEventListener("click", (e) => {
    toggleMenu();
})

// Close menu on selecting option
