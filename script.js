let cartItems = [];
let totalAmount = 0;

function addToCart(item, price) {
    cartItems.push({ item, price });
    updateCart();
}

function removeFromCart(index) {
    totalAmount -= cartItems[index].price;
    cartItems.splice(index, 1);
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart");
    let totalElement = document.getElementById("total");
    cartList.innerHTML = "";
    totalAmount = 0;

    cartItems.forEach((cartItem, index) => {
        let li = document.createElement("li");
        li.textContent = `${cartItem.item} - ₹${cartItem.price}`;
        
        // Add a remove button for each item
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);

        cartList.appendChild(li);
        totalAmount += cartItem.price;
    });

    totalElement.textContent = `Total: ₹${totalAmount}`;
    updateUPILink();
}

function updateUPILink() {
    let upiID = "gourishankar9575@ybl"; // अपना UPI ID डालें
    let note = `Payment for Restaurant Order (Total: ₹${totalAmount})`;
    let upiLink = `upi://pay?pa=${upiID}&pn=Gourishankar&am=${totalAmount}&tn=${encodeURIComponent(note)}&cu=INR`;

    let payButton = document.getElementById("payButton");
    if (payButton) {
        payButton.href = upiLink;
        payButton.textContent = `Pay ₹${totalAmount} via UPI`;
    }
}

function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Total amount: ₹${totalAmount}. Click on 'Pay via UPI' to complete payment.`);
        sendOrderToServer();
    }
}

function sendOrderToServer() {
    const order = {
        items: cartItems,
        total: totalAmount
    };

    const phone = "+919575693559"; // Replace with customer's phone number

    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order, phone }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Example usage:
// Add items to cart
addToCart("Pizza", 200);
addToCart("Burger", 100);