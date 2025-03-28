document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const cart = [];
    let cartTotal = 0;
    
    // DOM Elements
    const cartToggle = document.querySelector('.cart-toggle');
    const cartContainer = document.querySelector('.cart-container');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    // Toggle cart visibility
    cartToggle.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartContainer.classList.remove('active');
    });
    
    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            if (category === 'all') {
                menuSections.forEach(section => section.classList.add('active'));
            } else {
                menuSections.forEach(section => {
                    section.classList.toggle('active', section.id === category);
                });
            }
        });
    });
    
    // Quantity controls
    document.querySelectorAll('.quantity-control').forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const quantityDisplay = control.querySelector('.quantity');
        
        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityDisplay.textContent);
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityDisplay.textContent);
            quantity++;
            quantityDisplay.textContent = quantity;
        });
    });
    
    // Add to cart functionality
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
    
    // Add item to cart
    function addToCart(name, price, quantity) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                name,
                price,
                quantity
            });
        }
        
        updateCart();
    }
    
    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        cartTotal = 0;
        let itemCount = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            cartTotal += itemTotal;
            itemCount += item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} x ${item.quantity} = ₹${itemTotal}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        cartTotalElement.textContent = cartTotal;
        cartCount.textContent = itemCount;
        cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
    
    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const order = {
            items: cart,
            total: cartTotal,
            timestamp: new Date().toISOString()
        };
        
        console.log('Order placed:', order);
        alert(`Order placed successfully!\nTotal: ₹${cartTotal}\nThank you for dining with us!`);
        
        cart.length = 0;
        updateCart();
        cartContainer.classList.remove('active');
    });
});