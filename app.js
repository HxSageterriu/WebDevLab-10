const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const maxPriceInput = document.getElementById("maxPrice");

let products = [];

// Fetch JSON using ES6 async/await
const loadProducts = async () => {
  const response = await fetch("products.json");
  products = await response.json();
  displayProducts(products);
};

// Display items using template literals + destructuring
const displayProducts = (items) => {
  productContainer.innerHTML = "";

  items.forEach(({ name, price, category }) => {
    const productHTML = `
      <div class="product">
        <h3>${name}</h3>
        <p>Category: ${category}</p>
        <p><strong>$${price}</strong></p>
      </div>
    `;
    productContainer.innerHTML += productHTML;
  });
};

// Sorting
document.getElementById("sortLow").addEventListener("click", () => {
  const sorted = [...products].sort((a, b) => a.price - b.price);
  displayProducts(sorted);
});

document.getElementById("sortHigh").addEventListener("click", () => {
  const sorted = [...products].sort((a, b) => b.price - a.price);
  displayProducts(sorted);
});

// Category Filter
categoryFilter.addEventListener("change", () => {
  const value = categoryFilter.value;

  const filtered =
    value === "all"
      ? products
      : products.filter((p) => p.category === value);

  displayProducts(filtered);
});

// Max Price Filter
maxPriceInput.addEventListener("input", () => {
  const max = Number(maxPriceInput.value);

  const filtered = products.filter((p) => p.price <= max);
  displayProducts(filtered);
});

// Reset
document.getElementById("reset").addEventListener("click", () => {
  maxPriceInput.value = "";
  categoryFilter.value = "all";
  displayProducts(products);
});

// Load data
loadProducts();
