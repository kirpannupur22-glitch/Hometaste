// API Configuration
const API_BASE = 'http://localhost:5000/api';

// Food Data
const foodData = [
    {
        id: 1,
        name: "Homemade Margherita Pizza",
        chef: "Chef Maria",
        category: "lunch",
        price: 450,
        rating: "⭐⭐⭐⭐⭐ 4.8",
        description: "Fresh mozzarella, tomato sauce, and basil on a crispy homemade crust",
        emoji: "🍕"
    },
    {
        id: 2,
        name: "Fluffy Pancakes",
        chef: "Chef Sarah",
        category: "breakfast",
        price: 200,
        rating: "⭐⭐⭐⭐⭐ 4.9",
        description: "Soft, fluffy pancakes served with maple syrup and fresh berries",
        emoji: "🥞"
    },
    {
        id: 3,
        name: "Butter Chicken",
        chef: "Chef Raj",
        category: "dinner",
        price: 350,
        rating: "⭐⭐⭐⭐ 4.7",
        description: "Tender chicken in a creamy tomato-based sauce with aromatic spices",
        emoji: "🍛"
    },
    {
        id: 4,
        name: "Chocolate Brownies",
        chef: "Chef Emma",
        category: "dessert",
        price: 150,
        rating: "⭐⭐⭐⭐⭐ 4.9",
        description: "Rich, fudgy chocolate brownies made with premium cocoa",
        emoji: "🍫"
    },
    {
        id: 5,
        name: "Biryani Rice",
        chef: "Chef Ahmed",
        category: "lunch",
        price: 400,
        rating: "⭐⭐⭐⭐⭐ 4.8",
        description: "Fragrant basmati rice cooked with tender meat and spices",
        emoji: "🍚"
    },
    {
        id: 6,
        name: "Spring Rolls",
        chef: "Chef Lisa",
        category: "snacks",
        price: 180,
        rating: "⭐⭐⭐⭐ 4.6",
        description: "Crispy spring rolls filled with vegetables and served with dipping sauce",
        emoji: "🥡"
    },
    {
        id: 7,
        name: "Grilled Fish",
        chef: "Chef Marco",
        category: "dinner",
        price: 500,
        rating: "⭐⭐⭐⭐⭐ 4.9",
        description: "Fresh fish grilled to perfection with lemon and herbs",
        emoji: "🐟"
    },
    {
        id: 8,
        name: "Cheesecake",
        chef: "Chef Sophie",
        category: "dessert",
        price: 250,
        rating: "⭐⭐⭐⭐⭐ 4.8",
        description: "Creamy cheesecake with a graham cracker crust and berry topping",
        emoji: "🍰"
    },
    {
        id: 9,
        name: "Pasta Carbonara",
        chef: "Chef Giovanni",
        category: "lunch",
        price: 380,
        rating: "⭐⭐⭐⭐ 4.7",
        description: "Creamy pasta with guanciale, eggs, and Pecorino Romano cheese",
        emoji: "🍝"
    },
    {
        id: 10,
        name: "Samosas",
        chef: "Chef Priya",
        category: "snacks",
        price: 120,
        rating: "⭐⭐⭐⭐ 4.5",
        description: "Crispy pastry triangles filled with spiced potatoes and peas",
        emoji: "📦"
    },
    {
        id: 11,
        name: "French Omelette",
        chef: "Chef Pierre",
        category: "breakfast",
        price: 220,
        rating: "⭐⭐⭐⭐⭐ 4.8",
        description: "Delicate French omelette with herbs, mushrooms, and cheese",
        emoji: "🍳"
    },
    {
        id: 12,
        name: "Tiramisu",
        chef: "Chef Lucia",
        category: "dessert",
        price: 280,
        rating: "⭐⭐⭐⭐⭐ 4.9",
        description: "Classic Italian dessert with mascarpone, espresso, and cocoa",
        emoji: "🎂"
    }
];

// Global Variables
let cart = [];
let currentFilter = 'all';
let selectedFood = null;
let selectedQuantity = 1;
let currentUser = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayMenu(foodData);
    setupSearchBar();
    loadCartFromStorage();
});

// Display Menu
function displayMenu(foods) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    if (foods.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No items found</p>';
        return;
    }

    foods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <div class="food-image">${food.emoji}</div>
            <div class="food-info">
                <div class="food-name">${food.name}</div>
                <div class="food-chef">👨‍🍳 ${food.chef}</div>
                <div class="food-description">${food.description}</div>
                <div class="food-rating">${food.rating}</div>
                <div class="food-footer">
                    <span class="food-price">₹${food.price}</span>
                    <button class="add-btn" onclick="openFoodModal(${food.id})">Add to Cart</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(foodCard);
    });
}

// Filter Category
function filterCategory(category) {
    currentFilter = category;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        displayMenu(foodData);
    } else {
        const filtered = foodData.filter(food => food.category === category);
        displayMenu(filtered);
    }
}

// Search Bar
function setupSearchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = foodData.filter(food =>
            food.name.toLowerCase().includes(query) ||
            food.description.toLowerCase().includes(query)
        );
        displayMenu(filtered);
    });
}

// Open Food Modal
function openFoodModal(foodId) {
    selectedFood = foodData.find(f => f.id === foodId);
    selectedQuantity = 1;

    document.getElementById('modalFoodName').textContent = selectedFood.name;
    document.getElementById('modalChef').textContent = selectedFood.chef;
    document.getElementById('modalDescription').textContent = selectedFood.description;
    document.getElementById('modalPrice').textContent = selectedFood.price;
    document.getElementById('modalRating').textContent = selectedFood.rating;
    document.getElementById('modalImage').textContent = selectedFood.emoji;
    document.getElementById('quantityDisplay').textContent = selectedQuantity;
    document.getElementById('specialInstructions').value = '';

    document.getElementById('foodModal').style.display = 'block';
}

function closeFoodModal() {
    document.getElementById('foodModal').style.display = 'none';
}

function increaseQty() {
    selectedQuantity++;
    document.getElementById('quantityDisplay').textContent = selectedQuantity;
}

function decreaseQty() {
    if (selectedQuantity > 1) {
        selectedQuantity--;
        document.getElementById('quantityDisplay').textContent = selectedQuantity;
    }
}

// Add to Cart
function addToCart() {
    const specialInstructions = document.getElementById('specialInstructions').value;
    const cartItem = {
        id: selectedFood.id,
        name: selectedFood.name,
        price: selectedFood.price,
        quantity: selectedQuantity,
        specialInstructions: specialInstructions,
        emoji: selectedFood.emoji
    };

    const existingItem = cart.find(item => item.id === selectedFood.id);
    if (existingItem) {
        existingItem.quantity += selectedQuantity;
    } else {
        cart.push(cartItem);
    }

    updateCartCount();
    saveCartToStorage();
    closeFoodModal();
    showNotification('Added to cart! 🎉');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Cart Functions
function openCartModal() {
    displayCartItems();
    updateCartSummary();
    document.getElementById('cartModal').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart"><div class="empty-cart-icon">🛒</div><p>Your cart is empty</p></div>';
        return;
    }

    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${itemTotal}</div>
                ${item.specialInstructions ? `<div style="font-size: 12px; color: #999; margin-top: 5px;">Note: ${item.specialInstructions}</div>` : ''}
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });
}

function removeFromCart(foodId) {
    cart = cart.filter(item => item.id !== foodId);
    updateCartCount();
    saveCartToStorage();
    displayCartItems();
    updateCartSummary();
    showNotification('Item removed from cart');
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + tax;

    document.getElementById('subtotal').textContent = subtotal;
    document.getElementById('deliveryFee').textContent = deliveryFee;
    document.getElementById('tax').textContent = tax;
    document.getElementById('totalPrice').textContent = total;
}

// Checkout Functions
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    closeCartModal();
    document.getElementById('checkoutModal').style.display = 'block';
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function completeOrder(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!fullName || !email || !phone || !address || !city || !postalCode || !paymentMethod) {
        showNotification('Please fill all fields!');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 50 + Math.round(subtotal * 0.05);

    // Simulate API call
    const orderData = {
        customer: { fullName, email, phone, address, city, postalCode },
        items: cart,
        total: total,
        paymentMethod: paymentMethod
    };

    console.log('Order submitted:', orderData);

    closeCheckoutModal();
    showOrderConfirmation(fullName, total);
    cart = [];
    updateCartCount();
    saveCartToStorage();
}

function showOrderConfirmation(name, total) {
    const confirmation = document.createElement('div');
    confirmation.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 40px; border-radius: 12px; z-index: 2000; text-align: center; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); max-width: 500px;';
    confirmation.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 15px; color: #2c2c2c;">Order Confirmed!</div>
        <div style="margin-bottom: 15px; color: #666;">
            <p><strong>Thank you, ${name}!</strong></p>
            <p>Order Total: <strong>₹${total}</strong></p>
            <p style="margin-top: 15px; font-size: 14px;">Your order will be delivered within 30-45 minutes</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="background: #d4af37; color: #2c2c2c; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">Close</button>
    `;
    const backdrop = document.createElement('div');
    backdrop.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1999;';
    backdrop.onclick = () => {
        backdrop.remove();
        confirmation.remove();
    };
    document.body.appendChild(backdrop);
    document.body.appendChild(confirmation);
}

// Auth Modal Functions
function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');

    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    }
}

// Contact Form
function handleContactForm(event) {
    event.preventDefault();
    showNotification('Thank you for your message! We will contact you soon.');
    event.target.reset();
}

// Close modals on background click
window.onclick = (event) => {
    const foodModal = document.getElementById('foodModal');
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const authModal = document.getElementById('authModal');

    if (event.target === foodModal) closeFoodModal();
    if (event.target === cartModal) closeCartModal();
    if (event.target === checkoutModal) closeCheckoutModal();
    if (event.target === authModal) closeAuthModal();
};

// Storage Functions
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}