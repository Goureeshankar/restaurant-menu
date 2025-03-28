let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.item} - ₹${item.price}</span>
            <button onclick="removeItem(${index})">❌</button>
        `;
        cartItems.appendChild(div);
    });
    
    document.getElementById('total').textContent = total;
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const orderDetails = {
        items: cart,
        total: total,
        timestamp: new Date().toLocaleString()
    };
    
    // Save to localStorage (replaces backend)
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
    
    alert(`Order placed successfully!\nTotal: ₹${total}\nThank you!`);
    cart = [];
    total = 0;
    updateCart();
    
    // In real app, this would notify the kitchen
    console.log('New order:', orderDetails);
}