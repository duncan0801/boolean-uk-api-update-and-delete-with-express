//This is where the functions that will be give to the roots will go
const { response } = require("express");
const Book = require("./model");

const { getAll, getOneById, creatOne, updateById, deleteById } = Book();

function getAllBooks(req, res) {
	getAll((result) => res.json({ books: result }));
}
function getOneBookById(req, res) {
	const queriedId = Number(req.params.id);
	getOneById(queriedId, (result) => {
		res.json({ book: result });
	});
}
function createOneBook(req, res) {
	const newBook = req.body;
	creatOne(newBook, (result) => {
		res.json({ newBook: result });
	});
}
function updateBookById(req, res) {
	const updateData = req.body;
	const bookId = Number(req.params.id);

	updateById(updateData, bookId, (result) => {
		res.json({ updatedBook: result });
	});
}
function deleteBookById(req, res) {
	const bookId = Number(req.params.id);

	deleteById(bookId, (deletedBook) => {
		res.json({
			msg: `You successfully deleted the book with id: ${bookId}`,
		});
	});
}

module.exports = {
	getAllBooks,
	getOneBookById,
	createOneBook,
	updateBookById,
	deleteBookById,
};
