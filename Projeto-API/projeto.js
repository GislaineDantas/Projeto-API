const API_URL = "https://fakestoreapi.com/products";
const productsContainer = document.getElementById("productsContainer");
const productForm = document.getElementById("productForm");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");

let produtos = [];
let editarModelo = false;
let editarId = null;

// Carregar os produtos da API e exibi-los
function loadProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            produtos = data; // Armazena os produtos na variável local
            renderProducts();
        })
        .catch(error => console.error("Erro ao carregar os produtos:", error));
}

// Exibir os produtos na interface
function renderProducts() {
    productsContainer.innerHTML = '';
    produtos.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.substring(0, 100)}...</p>
            <p class="price">R$ ${product.price.toFixed(2)}</p>
            <button onclick="editProduct(${product.id})">Editar</button>
            <button onclick="deleteProduct(${product.id})">Excluir</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Adicionar ou editar um produto
productForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const price = parseFloat(priceInput.value);
    const image = imageInput.value;

    if (editarModelo) {
        // Atualizar produto existente
        const productIndex = produtos.findIndex(p => p.id === editarId);
        produtos[productIndex] = { id: editarId, title, description, price, image };
        editarModelo = false;
        editarId = null;
    } else {
        // Adicionar novo produto
        const newProduct = {
            id: Date.now(), // Gera um ID temporário
            title,
            description,
            price,
            image
        };
        produtos.push(newProduct);
    }

    renderProducts();
    productForm.reset(); // Limpar o formulário
});

// Editar produto
function editProduct(id) {
    editarModelo = true;
    editarId = id;

    const product = produtos.find(p => p.id === id);
    titleInput.value = product.title;
    descriptionInput.value = product.description;
    priceInput.value = product.price;
    imageInput.value = product.image;
}

// Excluir produto
function deleteProduct(id) {
    produtos = produtos.filter(product => product.id !== id);
    renderProducts();
}

// Carregar os produtos ao iniciar a página
loadProducts();