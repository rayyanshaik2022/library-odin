const addBtn = document.querySelector(".add-btn");
const addPopUp = document.querySelector(".add-pop-up");

addBtn.addEventListener("click", (e) => {
    addPopUp.classList.add("active");
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPagesRead.value = 0;
    bookTotalPages.value = 0;
});

// Close popup when click is outside
const popup = document.querySelector(".add-pop-up");
const editPopup = document.querySelector(".edit-pop-up");

function closePopup() {
    popup.classList.toggle("active");
}

function closeEditPopup() {
    editPopup.classList.toggle("active");
}

// Open/Close drop-down menu
const statusBtn = document.querySelector(".dd-button");
const statusMenu = document.querySelector(".dd-menu");

const statusEditBtn = document.querySelector("#dd-btn-edit");
const statusEditMenu = document.querySelector("#dd-menu-edit");

function toggleMenu() {
    statusMenu.classList.toggle("active");
}
statusBtn.addEventListener("click", (e) => {
    toggleMenu();
});

statusEditBtn.addEventListener("click", (e) => {
    statusEditMenu.classList.toggle("active");
});

// Close menu on selecting option
let statusVal = "Reading";
const readBtn = document.querySelector("#read-btn");
const compBtn = document.querySelector("#comp-btn");
const planBtn = document.querySelector("#plan-btn");
const pausBtn = document.querySelector("#paus-btn");
const readBtnEdit = document.querySelector("#read-btn-edit");
const compBtnEdit = document.querySelector("#comp-btn-edit");
const planBtnEdit = document.querySelector("#plan-btn-edit");
const pausBtnEdit = document.querySelector("#paus-btn-edit");
const ddBtn = document.querySelector(".dd-button");
const ddBtnEdit = document.querySelector("#dd-btn-edit");

function updateStatus(btn, newStatus, dropBtn = ddBtn) {
    btn.addEventListener("click", (e) => {
        statusVal = newStatus;
        dropBtn.textContent = newStatus;

        statusMenu.classList.remove("active");
        statusEditMenu.classList.remove("active");
    });
}

updateStatus(readBtn, "Reading");
updateStatus(compBtn, "Completed");
updateStatus(planBtn, "Plan to read");
updateStatus(pausBtn, "Paused");

updateStatus(readBtnEdit, "Reading", ddBtnEdit);
updateStatus(compBtnEdit, "Completed", ddBtnEdit);
updateStatus(planBtnEdit, "Plan to read", ddBtnEdit);
updateStatus(pausBtnEdit, "Paused", ddBtnEdit);

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
            }
        });

        if (valid) {
            confirmBtn.classList.add("valid");
        } else {
            confirmBtn.classList.remove("valid");
        }
    });
});

// Toggle confirm add button depending on input
const bookTitleEdit = document.querySelector('input[name="edit-title"]');
const bookAuthorEdit = document.querySelector('input[name="edit-author"]');
const bookPagesReadEdit = document.querySelector(
    'input[name="edit-pages-read"]'
);
const bookTotalPagesEdit = document.querySelector(
    'input[name="edit-total-pages"]'
);

let inputsListEdit = [bookTitleEdit, bookAuthorEdit, bookPagesReadEdit];
let confirmBtnEdit = document.querySelector("#confirm-edit-btn");

inputsListEdit.forEach((ele) => {
    ele.addEventListener("input", (e) => {
        let valid = true;
        inputsListEdit.forEach((ele2) => {
            if (ele2.value.length < 1) {
                valid = false;
            }
        });

        if (valid) {
            confirmBtnEdit.classList.add("valid");
        } else {
            confirmBtnEdit.classList.remove("valid");
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

let booksDict = {};
let bookId = 0;
let currentlyEditing = null;

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
                    <div class="value book-pages-read">${book.pages}</div>
                </div>
                <hr />
                <div class="text-pair">
                    <div class="key">Total pages:</div>
                    <div class="value book-total-pages">${book.totalPages}</div>
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
    </div>`;

    bookCard.dataset.id = bookId;
    cardContainer.appendChild(bookCard);
    booksDict[bookId] = bookCard;
    bookId++;

    bookTitle.value = "";
    bookAuthor.value = "";
    bookPagesRead.value = 0;
    bookTotalPages.value = 0;

    // Open edit menu
    const moreBtn = bookCard.querySelector(".more-btn");
    moreBtn.addEventListener("click", (e) => {
        editPopup.classList.add("active");

        editPopup.querySelector('input[name="edit-title"]').value =
            bookCard.querySelector(".book-title").textContent;

        editPopup.querySelector('input[name="edit-author"]').value =
            bookCard.querySelector(".book-author").textContent;

        editPopup.querySelector('input[name="edit-pages-read"]').value =
            bookCard.querySelector(".book-pages-read").textContent;

        editPopup.querySelector('input[name="edit-total-pages"]').value =
            bookCard.querySelector(".book-total-pages").textContent;

        editPopup.querySelector("#dd-btn-edit").textContent =
            bookCard.querySelector(".book-status").textContent;

        currentlyEditing = bookCard;
    });
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
    nextBook.totalPages = bookTotalPages.value;

    createBookElement(nextBook);
    popup.classList.toggle("active");

    // Set values to what they currenlty are on book
});

// Confirm card edit
confirmBtnEdit.addEventListener("click", (e) => {
    if (!confirmBtnEdit.classList.contains("valid")) {
        return;
    }

    // Make changes
    editPopup.classList.remove("active");

    const bookCard = currentlyEditing;

    bookCard.querySelector(".book-title").textContent = editPopup.querySelector(
        'input[name="edit-title"]'
    ).value;
    bookCard.querySelector(".book-author").textContent =
        editPopup.querySelector('input[name="edit-author"]').value;
    bookCard.querySelector(".book-pages-read").textContent =
        editPopup.querySelector('input[name="edit-pages-read"]').value;
    bookCard.querySelector(".book-total-pages").textContent =
        editPopup.querySelector('input[name="edit-total-pages"]').value;

    bookCard.querySelector(".book-status").textContent = editPopup.querySelector("#dd-btn-edit").textContent;
        
});


// Delete card
const deleteBtn = document.querySelector("#delete-btn");
deleteBtn.addEventListener("click", (e) => {
    let bookCard = currentlyEditing;

    cardContainer.removeChild(bookCard);
    editPopup.classList.remove("active");
});

let defaultBook = new Book(
    "The Hobbit",
    "J. R. R. Tolkien",
    122,
    "In Progress"
);
defaultBook.totalPages = 304;
createBookElement(defaultBook);
