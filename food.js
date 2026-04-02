const express = require('express');
const router = express.Router();

// Mock food data
const foods = [
    {
        id: 1,
        name: "Homemade Margherita Pizza",
        chef: "Chef Maria",
        category: "lunch",
        price: 450,
        rating: 4.8,
        description: "Fresh mozzarella, tomato sauce, and basil on a crispy homemade crust"
    },
    {
        id: 2,
        name: "Fluffy Pancakes",
        chef: "Chef Sarah",
        category: "breakfast",
        price: 200,
        rating: 4.9,
        description: "Soft, fluffy pancakes served with maple syrup and fresh berries"
    },
    {
        id: 3,
        name: "Butter Chicken",
        chef: "Chef Raj",
        category: "dinner",
        price: 350,
        rating: 4.7,
        description: "Tender chicken in a creamy tomato-based sauce with aromatic spices"
    },
    {
        id: 4,
        name: "Chocolate Brownies",
        chef: "Chef Emma",
        category: "dessert",
        price: 150,
        rating: 4.9,
        description: "Rich, fudgy chocolate brownies made with premium cocoa"
    },
    {
        id: 5,
        name: "Biryani Rice",
        chef: "Chef Ahmed",
        category: "lunch",
        price: 400,
        rating: 4.8,
        description: "Fragrant basmati rice cooked with tender meat and spices"
    },
    {
        id: 6,
        name: "Spring Rolls",
        chef: "Chef Lisa",
        category: "snacks",
        price: 180,
        rating: 4.6,
        description: "Crispy spring rolls filled with vegetables and served with dipping sauce"
    }
];

// Get all foods
router.get('/', (req, res) => {
    res.json(foods);
});

// Get food by category
router.get('/category/:category', (req, res) => {
    const category = req.params.category;
    const filtered = foods.filter(f => f.category === category);
    res.json(filtered);
});

// Get single food
router.get('/:id', (req, res) => {
    const food = foods.find(f => f.id === parseInt(req.params.id));
    if (!food) {
        return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
});

module.exports = router;