let cart = [];
let total = 0;

// Function to add items to the cart
function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total;
}

// Function to handle checkout
function checkout() {
    // Create an order object
    const order = {
        items: JSON.stringify(cart), // Convert cart array to string
        total: total,
        timestamp: new Date()
    };

    // Log the Firestore database object to the console
    console.log("Firestore Database:", db);

    // Save order to Firestore
    db.collection('orders').add(order)
        .then(() => {
            alert('Order placed successfully! Total: ₹' + total);
            // Clear the cart
            cart = [];
            total = 0;
            updateCart();
        })
        .catch((error) => {
            console.error('Error saving order: ', error);
            alert('Failed to place order. Please try again.');
        });
}