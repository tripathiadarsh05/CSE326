
let cart = [];

const displayProducts = () => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    
    productList.appendChild(productDiv);
  });
};

const addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCart();
};

const updateCart = () => {
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  
  cartItems.innerHTML = '';
  
  let totalPrice = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    
    cartItems.appendChild(itemDiv);
  });
};

// Remove item from cart
const removeFromCart = (productId) => {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
  }
  updateCart();
};

// Checkout
const checkout = () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
  }
};

// Event listeners
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Initial display
displayProducts();