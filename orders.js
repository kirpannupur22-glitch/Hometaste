const express = require('express');
const router = express.Router();

// Mock orders database
const orders = [];

// Create order
router.post('/', (req, res) => {
    try {
        const { customer, items, total, paymentMethod } = req.body;

        const newOrder = {
            id: orders.length + 1,
            customer,
            items,
            total,
            paymentMethod,
            status: 'pending',
            createdAt: new Date(),
            estimatedDelivery: new Date(Date.now() + 45 * 60000) // 45 minutes from now
        };

        orders.push(newOrder);

        res.status(201).json({ 
            message: 'Order created successfully',
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all orders
router.get('/', (req, res) => {
    res.json(orders);
});

// Get order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});

// Update order status
router.put('/:id/status', (req, res) => {
    try {
        const order = orders.find(o => o.id === parseInt(req.params.id));
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = req.body.status;
        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;