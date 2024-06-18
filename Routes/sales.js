const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');
const Product = require('../models/product');

// Create
router.post('/', async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.findAll({ include: Product });
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, { include: Product });
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ error: 'Sale not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Sale.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedSale = await Sale.findByPk(req.params.id, { include: Product });
      res.status(200).json(updatedSale);
    } else {
      res.status(404).json({ error: 'Sale not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Sale.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Sale not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

