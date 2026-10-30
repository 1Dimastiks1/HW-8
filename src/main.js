const bookmarkInput = document.querySelector("#bookmarkInput");
const addBookmarkBtn = document.querySelector("#addBookmarkBtn");
const bookmarkList = document.querySelector("#bookmarkList");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) ?? [];

const renderBookmarks = () => {
  bookmarkList.innerHTML = bookmarks
    .map(
      (url, index) => `
      <li>
        <a href="${url}" target="_blank">${url}</a>
        <div>
          <button class="edit" data-index="${index}">Редагувати</button>
          <button class="delete" data-index="${index}">X</button>
        </div>
      </li>
    `,
    )
    .join("");
};

const saveAndRenderBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  renderBookmarks();
};

addBookmarkBtn.addEventListener("click", () => {
  const url = bookmarkInput.value.trim();
  if (!url) return;
  bookmarks.push(url);
  bookmarkInput.value = "";
  saveAndRenderBookmarks();
});

bookmarkList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("delete")) {
    bookmarks.splice(index, 1);
    saveAndRenderBookmarks();
  }

  if (e.target.classList.contains("edit")) {
    const currentUrl = bookmarks[index];
    const newUrl = prompt("Редагувати посилання (URL):", currentUrl);

    if (newUrl !== null && newUrl.trim() !== "") {
      bookmarks[index] = newUrl.trim();
      saveAndRenderBookmarks();
    }
  }
});

renderBookmarks();

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const saveBtn = document.querySelector("#saveBtn");
const STORAGE_KEY = "formData";

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedData) {
  usernameInput.value = savedData.username ?? "";
  passwordInput.value = savedData.password ?? "";
}

saveBtn.addEventListener("click", () => {
  const formData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  alert("Дані успішно збережено!");
});

const products = [
  { name: "Яблука", price: 25, description: "Свіжі солодкі яблука" },
  { name: "Молоко", price: 35, description: "Коров'яче молоко 2.5%" },
  { name: "Хліб", price: 20, description: "Свіжий пшеничний хліб" },
  { name: "Сир", price: 80, description: "Твердий сир український" },
];

const productList = document.querySelector("#productList");
const searchBox = document.querySelector("#searchBox");

const renderProducts = (items) => {
  productList.innerHTML = items
    .map(
      ({ name, price, description }) => `
      <li class="product-item">
        <h2 class="name">${name}</h2> 
        <p class="price">Price: ${price} грн</p> 
        <p class="description">${description}</p>
      </li>
    `,
    )
    .join("");
};

renderProducts(products);

searchBox.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filteredProducts = products.filter(({ name }) =>
    name.toLowerCase().includes(query),
  );
  renderProducts(filteredProducts);
});
