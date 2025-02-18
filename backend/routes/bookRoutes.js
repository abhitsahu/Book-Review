const express = require("express");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all books with pagination (Only 2 books per page)
router.get("/book", async (req, res) => {
  try {
    let { page = 1 } = req.query; // Default page = 1
    page = parseInt(page);
    const limit = 2; // Fixed limit to 2 books per page

    const totalBooks = await Book.countDocuments(); // Get total count of books
    const books = await Book.find()
      .populate("reviews")
      .sort({ createdAt: -1 }) // Show latest books first
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      books,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
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
    const book = await Book.findById(req.params.id).populate("reviews"); // Populate reviews
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
