document.addEventListener('DOMContentLoaded', function() {
    const ordersContainer = document.getElementById('orders-container');
    
    // Simulated WebSocket connection for real-time updates
    function connectToKitchenFeed() {
        // In a real app, this would connect to your backend
        setInterval(fetchOrders, 3000); // Poll every 3 seconds
    }
    
    function fetchOrders() {
        // In a real app, this would fetch from your API
        const mockOrders = [
            {
                id: 1,
                table: 'Table 5',
                items: [
                    { name: 'Paneer Tikka', quantity: 2, price: 220 },
                    { name: 'Butter Naan', quantity: 3, price: 40 }
                ],
                total: 560,
                status: 'pending',
                timestamp: new Date().toISOString()
            }
        ];
        
        displayOrders(mockOrders);
    }
    
    function displayOrders(orders) {
        ordersContainer.innerHTML = '';
        
        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            
            let itemsHtml = '';
            order.items.forEach(item => {
                itemsHtml += `
                    <div class="menu-item">
                        <span>${item.name}</span>
                        <span>${item.quantity} x ₹${item.price}</span>
                    </div>
                `;
            });
            
            orderCard.innerHTML = `
                <h3>Order #${order.id} (${order.table})</h3>
                <div class="order-items">${itemsHtml}</div>
                <div class="order-footer">
                    <strong>Total: ₹${order.total}</strong>
                    <span class="order-status status-${order.status}">
                        ${order.status.toUpperCase()}
                    </span>
                </div>
                <div class="order-actions">
                    <button class="status-btn" data-order="${order.id}" data-status="preparing">
                        Start Preparing
                    </button>
                    <button class="status-btn" data-order="${order.id}" data-status="ready">
                        Mark as Ready
                    </button>
                </div>
            `;
            
            ordersContainer.appendChild(orderCard);
        });
    }
    
    connectToKitchenFeed();
});