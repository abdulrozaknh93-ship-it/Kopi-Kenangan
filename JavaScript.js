// Data Produk Kopi Kenangan & Makanan
const products = [
  {
    id: 1,
    name: "Avocado Coffee",
    brand: "Kopi Kenangan",
    category: "Fruit Mix",
    price: 24000,
    stock: 25,
    unit: "Cup",
    status: "Ready",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80",
    desc: "Perpaduan espresso kaya rasa dengan kelezatan buah alpukat segar.",
  },
  {
    id: 2,
    name: "Taro Velvet Coffee",
    brand: "Kopi Kenangan",
    category: "Taro & Choco",
    price: 26000,
    stock: 15,
    unit: "Cup",
    status: "Ready",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80",
    desc: "Manis khas taro berpadu lembut dengan house blend kopi pilihan.",
  },
  {
    id: 3,
    name: "Roti Coklat Klasik",
    brand: "Cerita Roti",
    category: "Cerita Roti",
    price: 12000,
    stock: 30,
    unit: "Pcs",
    status: "Ready",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
    desc: "Roti empuk denganisian selai cokelat tebal dan lezat.",
  },
];

let cart = JSON.parse(localStorage.getItem("kopi_kenangan_cart")) || [];

function renderProducts(items) {
  const container = document.getElementById("productContainer");
  if (!container) return;
  container.innerHTML = "";

  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = `bg-white rounded-2xl p-4 shadow-sm border border-sage-100 flex flex-col justify-between transition hover:shadow-md`;
    card.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-xl mb-4">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-sage-100 text-sage-700">${product.category}</span>
                <h3 class="font-bold text-stone-800 mt-2 text-lg font-['Poppins']">${product.name}</h3>
                <p class="text-stone-500 text-sm mb-4">${product.desc}</p>
            </div>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                <span class="font-bold text-terracotta-600 text-lg">Rp ${product.price.toLocaleString("id-ID")}</span>
                <button onclick="addToCart(${product.id})" class="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">Beli</button>
            </div>
        `;
    container.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product || product.stock <= 0) return;

  let item = cart.find((i) => i.id === id);
  if (item) {
    if (item.qty < product.stock) {
      item.qty++;
    }
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("kopi_kenangan_cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalQty;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  updateCartBadge();
});
