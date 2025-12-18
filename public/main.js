const API_URL = "/api/v1";
let token = localStorage.getItem("token");
let username = localStorage.getItem("username");

const authSection = document.getElementById("auth-section");
const librarySection = document.getElementById("library-section");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authMessage = document.getElementById("auth-message");
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const displayUsername = document.getElementById("display-username");
const logoutBtn = document.getElementById("logout-btn");
const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Init
if (token) {
    showLibrary();
}

// Tabs switching
tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
});

tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    registerForm.style.display = "flex";
    loginForm.style.display = "none";
});

// Auth Logic
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("login-username").value;
    const passwordInput = document.getElementById("login-password").value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });
        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", usernameInput);
            token = data.token;
            username = usernameInput;
            showLibrary();
        } else {
            authMessage.innerText = data.message;
            authMessage.style.color = "#f87171";
        }
    } catch (err) {
        authMessage.innerText = "Error conectando con el servidor";
    }
});

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("reg-username").value;
    const emailInput = document.getElementById("reg-email").value;
    const passwordInput = document.getElementById("reg-password").value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usernameInput, email: emailInput, password: passwordInput })
        });
        const data = await res.json();
        authMessage.innerText = data.message;
        authMessage.style.color = data.message.includes("éxito") ? "#4ade80" : "#f87171";
    } catch (err) {
        authMessage.innerText = "Error conectando con el servidor";
    }
});

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload();
});

function showLibrary() {
    authSection.style.display = "none";
    librarySection.style.display = "block";
    displayUsername.innerText = username;
    fetchBooks();
}

async function fetchBooks() {
    try {
        const res = await fetch(`${API_URL}/books`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const books = await res.json();
        renderBooks(books);
    } catch (err) {
        console.error(err);
    }
}

searchBtn.addEventListener("click", async () => {
    const q = searchInput.value;
    if (!q) return fetchBooks();

    // The API has specific search endpoints, but let's try a simple title search first
    // If we want more robust search we might need to update the API or handle it here
    try {
        const res = await fetch(`${API_URL}/title`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: q })
        });
        const data = await res.json();
        renderBooks(data.foundBooks || []);
    } catch (err) {
        console.error(err);
    }
});

function renderBooks(books) {
    booksGrid.innerHTML = "";
    if (books.length === 0) {
        booksGrid.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.ISBN}</p>
            <span class="tag">ID: ${book.id}</span>
        `;
        booksGrid.appendChild(card);
    });
}
