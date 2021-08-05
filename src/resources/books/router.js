const express = require("express");
const {
	getAllBooks,
	getOneBookById,
	createOneBook,
	updateBookById,
} = require("./controller");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getOneBookById);
router.post("/", createOneBook);
router.patch("/:id", updateBookById);

module.exports = router;
