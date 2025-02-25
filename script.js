let cartItems = [];
let totalAmount = 0;

function addToCart(item, price) {
    cartItems.push({ item, price });
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart");
    let totalElement = document.getElementById("total");
    cartList.innerHTML = "";
    totalAmount = 0;

    cartItems.forEach(cartItem => {
        let li = document.createElement("li");
        li.textContent = `${cartItem.item} - ₹${cartItem.price}`;
        cartList.appendChild(li);
        totalAmount += cartItem.price;
    });

    totalElement.textContent = totalAmount;
    updateUPILink();
}

function updateUPILink() {
    let upiID = "9575693559-2@axl";
    let upiLink = `upi://pay?pa=${upiID}&pn=Restaurant&mc=&tid=&tr=&tn=Restaurant Payment&am=${totalAmount}&cu=INR`;
    
    let payButton = document.getElementById("payButton");
    payButton.href = upiLink;
}

function checkout() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert(`Total amount: ₹${totalAmount}. Click on 'Pay via UPI' to complete payment.`);
    }
}