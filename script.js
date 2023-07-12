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
});

// Close menu on selecting option
let statusVal = "Reading";
const readBtn = document.querySelector("#read-btn");
const compBtn = document.querySelector("#comp-btn");
const planBtn = document.querySelector("#plan-btn");
const pausBtn = document.querySelector("#paus-btn");
const ddBtn = document.querySelector(".dd-button");

function updateStatus(btn, newStatus) {
    btn.addEventListener("click", (e) => {
        statusVal = newStatus;
        ddBtn.textContent = newStatus;

        statusMenu.classList.toggle("active");
    });
}

updateStatus(readBtn, "Reading");
updateStatus(compBtn, "Completed");
updateStatus(planBtn, "Plan to read");
updateStatus(pausBtn, "Paused");

// Toggle confirm add button depending on input
const bookTitle = document.querySelector('input[name="title"]');
const bookAuthor = document.querySelector('input[name="author"]');
const bookPagesRead = document.querySelector('input[name="pages-read"]');
const bookTotalPages = document.querySelector('input[name="total-pages"]');

let inputsList = [bookTitle, bookAuthor, bookPagesRead];
let confirmBtn = document.querySelector(".confirm-add-btn");

inputsList.forEach((ele) => {
    ele.addEventListener("input", (e) => {
        let valid = true;
        inputsList.forEach((ele2) => {
            if (ele2.value.length < 1) {
                valid = false;
                console.log("e");
            }
        });

        if (valid) {
            console.log("e");
            confirmBtn.classList.add("valid");
        } else {
            confirmBtn.classList.remove("valid");
        }
    });
});

// Books & Book cards
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = 0;
    this.totalPages = 0;
}

let booksList = [];
let bookId = 0;

const cardContainer = document.querySelector(".card-container");
function createBookElement(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `<div class="card-push-top">
        <div class="book-title">${book.title}</div>
        <div class="card-content">
            <div class="card-left">
                <p>
                    by
                    <span class="book-author"
                        >${book.author}</span
                    >
                </p>
            </div>
            <div class="card-divider"></div>
            <div class="card-right">
                <div class="text-pair">
                    <div class="key">Current page:</div>
                    <div class="value">${book.pages}</div>
                </div>
                <hr />
                <div class="text-pair">
                    <div class="key">Total pages:</div>
                    <div class="value">${book.totalPages}</div>
                </div>
                <hr />
                <div class="text-pair">
                    <div class="key">Progress:</div>
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                        <div class="progress-text">40%</div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    </div>
    <div class="card-push-bot">
        <hr />
        <div class="book-status">${statusVal}</div>
    </div>
    <div class="more-btn">
        <img
            draggable="false"
            class="more-icon icon-white"
            src="./assets/icons/more.svg"
            alt="... icon"
        />
    </div>`

    bookCard.dataset.id = bookId;
    cardContainer.appendChild(bookCard);
    booksList.push([bookId, bookCard]);
    bookId ++;

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPagesRead.value = 0;
    bookTotalPages.value = 0;
}

confirmBtn.addEventListener("click", (e) => {
    if (!confirmBtn.classList.contains("valid")) {
        return;
    }
    let nextBook = new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPagesRead.value,
        statusVal
    );

    createBookElement(nextBook);
    popup.classList.toggle("active");
});




let defaultBook = new Book("The Hobbit", "J. R. R. Tolkien", 122, "In Progress");
defaultBook.totalPages = 304;

createBookElement(defaultBook);