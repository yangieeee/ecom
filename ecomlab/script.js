const products = [
    { name: 'Vanilla Lace', price: 10, image: 'image1.jpg' },
    { name: 'Santal Nightfall', price: 15, image: 'image2.jpeg' },
    { name: 'Bombshell', price: 20, image: 'image3.jpeg' },
    { name: 'Secret Charm', price: 25, image: 'image4.jpeg' },
    { name: 'Tease Cocoa', price: 25, image: 'image5.jpg' },
    { name: 'Bare Vanilla', price: 25, image: 'image6.jpg' },
    { name: 'Secret Perfume', price: 10, image: 'image7.jpg' },
    { name: 'Platinum Ice', price: 15, image: 'image8.jpeg' },
    { name: 'Garden View', price: 15, image: 'image9.jpg' },
    { name: 'Scandalous', price: 25, image: 'image10.jpg' },
    { name: 'Love Spell', price: 20, image: 'image11.jpg' },
    { name: 'Wild Primrose', price: 20, image: 'image12.jpg' }
];

const cart = [];
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const modalImage = document.getElementById('modal-image');
const modal = document.getElementById('modal');
const removeAllButton = document.getElementById('remove-all-button');
const checkoutButton = document.getElementById('checkout-button');
const checkoutMessage = document.getElementById('checkout-message');

products.forEach((product, index) => {
    const productElem = document.createElement('div');
    productElem.className = 'product';
    productElem.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" onclick="openModal('${product.image}')" style="cursor:pointer;" />
        <p>Price: $${product.price}</p>
        <button class="add-to-cart-button" onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(productElem);
});

function addToCart(index) {
    const product = products[index];
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItemElem = document.createElement('div');
        cartItemElem.className = 'cart-item';
        cartItemElem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div>
                <p>${item.name} - $${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="changeQuantity('${item.name}', -1)" ${item.quantity === 1 ? 'disabled' : ''}>-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    <button class="remove-button" onclick="removeFromCart('${item.name}')">
                        <img src="https://img.icons8.com/material-outlined/24/000000/trash.png" alt="Remove" />
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItemElem);
    });

    totalPriceElem.textContent = totalPrice.toFixed(2);
    removeAllButton.style.display = cart.length > 0 ? 'block' : 'none'; // Show or hide the button
    checkoutButton.style.display = cart.length > 0 ? 'block' : 'none'; // Show or hide the checkout button
}

function changeQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1); // Remove item if quantity is zero
        }
        updateCartDisplay();
    }
}

function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        cart.splice(index, 1); // Remove the item from the cart
        updateCartDisplay();
    }
}

function removeAllFromCart() {
    cart.length = 0; // Clear the cart
    updateCartDisplay();
}

function checkout() {
    if (cart.length > 0) {
        checkoutMessage.style.display = 'block';
        setTimeout(() => {
            checkoutMessage.style.display = 'none';
        }, 3000);
    }
}

function openModal(imageSrc) {
    modalImage.src = imageSrc;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}