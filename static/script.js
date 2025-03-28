document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    let cartTotal = 0;

    const cartToggle = document.querySelector('.cart-toggle');
    const cartContainer = document.querySelector('.cart-container');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');

    cartToggle.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
    });

    closeCart.addEventListener('click', () => {
        cartContainer.classList.remove('active');
    });

    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('.item-name').textContent;
            const itemPrice = parseInt(menuItem.querySelector('.item-price').textContent.replace('₹', ''));
            const quantity = parseInt(menuItem.querySelector('.quantity').textContent);
            
            if (quantity > 0) {
                addToCart(itemName, itemPrice, quantity);
                menuItem.querySelector('.quantity').textContent = '0';
            }
        });
    });

    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
