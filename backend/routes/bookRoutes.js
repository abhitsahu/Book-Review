const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all books
router.get("/book", async (req, res) => {
  const books = await Book.find().populate("reviews");
  res.json(books);
});

// Add new book (Admin Only)
router.post("/addbook", authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { title, author, description } = req.body;
    const book = new Book({ title, author, description });
    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Book Details by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews'); // Populate reviews
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;