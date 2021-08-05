const express = require("express");
const {
	getAllBooks,
	getOneBookById,
	createOneBook,
	updateBookById,
    deleteBookById
} = require("./controller");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getOneBookById);
router.post("/", createOneBook);
router.patch("/:id", updateBookById);
router.delete("/:id", deleteBookById)

module.exports = router;
