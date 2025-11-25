const asyncHandler = require('express-async-handler');
const Number = require('../models/numberModel');

// @desc    Fetch all numbers
// @route   GET /api/numbers
// @access  Public
const getNumbers = asyncHandler(async (req, res) => {
  // Fetch all numbers, sort by newest first
  const numbers = await Number.find({}).sort({ createdAt: -1 });
  res.status(200).json(numbers);
});

// @desc    Add a new fancy number
// @route   POST /api/numbers
// @access  Private (Admin only)
const addNumber = asyncHandler(async (req, res) => {
  const { number, numbers } = req.body; // Accept 'number' (string) or 'numbers' (array)

  // HANDLE BULK UPLOAD
  if (numbers && Array.isArray(numbers)) {
    const processedNumbers = numbers.map(num => ({
      number: num.trim(),
      operator: 'Vi'
    }));

    // Insert only ones that don't exist (Ordered: false ensures one error doesn't stop the whole batch)
    try {
      const createdNumbers = await Number.insertMany(processedNumbers, { ordered: false });
      res.status(201).json(createdNumbers);
    } catch (error) {
      // If some fail (duplicates), we still return success for the others
      res.status(201).json({ message: 'Processed bulk upload. Some duplicates might have been skipped.' });
    }
    return;
  }

  // HANDLE SINGLE UPLOAD (Old Logic)
  if (!number) {
    res.status(400);
    throw new Error('Please add a number field');
  }

  const numberExists = await Number.findOne({ number });
  if (numberExists) {
    res.status(400);
    throw new Error('Number already listed');
  }

  const newNumber = await Number.create({
    number,
    operator: 'Vi'
  });

  res.status(201).json(newNumber);
});

// @desc    Delete a number (Mark as Sold / Remove)
// @route   DELETE /api/numbers/:id
// @access  Private (Admin only)
const deleteNumber = asyncHandler(async (req, res) => {
  const number = await Number.findById(req.params.id);

  if (!number) {
    res.status(404);
    throw new Error('Number not found');
  }

  await number.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Number removed' });
});

module.exports = {
  getNumbers,
  addNumber,
  deleteNumber,
};