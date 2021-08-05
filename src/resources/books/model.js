// This is where our table schema and query function go
const dbClient = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
	// If a table does not exsist, one will be created when this function is called
	function createTable() {
		const sql = `
        DROP TABLE books;

        CREATE TABLE IF NOT EXISTS books (
            id              SERIAL      PRIMARY KEY,
            title           VARCHAR(255) NOT NULL,
            type            VARCHAR(255) NOT NULL,
            author          VARCHAR(255) NOT NULL,
            topic           VARCHAR(255) NOT NULL,
            publicationdate DATE        NOT NULL
        );
        `;

		dbClient
			.query(sql)
			.then(() => console.log("Book table CREATED"))
			.catch((error) => console.log(error));
	}
	function mockData() {
		const createBook = `
            INSERT INTO books
                (title, type, author, topic, publicationdate)
            VALUES 
            ($1, $2, $3, $4, $5);
        `;
		const books = buildBooksDatabase();

		books.forEach((book) => {
			const bookValues = Object.values(book);
			dbClient.query(createBook, bookValues).catch(console.error);
		});
	}
	function getAll(callback) {
		const sql = `
        SELECT * FROM books;
        `;
		dbClient
			.query(sql)
			.then((result) => {
				console.log(result.rows);
				callback(result.rows);
			})
			.catch(console.error);
	}
	function getOneById(bookId, callback) {
		const sql = `
            SELECT * FROM books
            WHERE id = ($1);
        `;

		dbClient
			.query(sql, [bookId])
			.then((resp) => {
				console.log(resp.rows[0]);
				callback(resp.rows[0]);
			})
			.catch(console.error);
	}
	function creatOne(newBook, callback) {
		const { title, type, author, topic, publicationdate } = newBook;

		const sql = `
        INSERT INTO books
            (title, type, author, topic, publicationdate)
        VALUES
            ($1,$2,$3,$4,$5)
        RETURNING *;
        `;

		dbClient
			.query(sql, [title, type, author, topic, publicationdate])
			.then((resp) => {
				console.log(resp.rows);
				callback(resp.rows[0]);
			})
			.catch(console.error);
	}
	function updateById(updateBody, bookId, callback) {
		//1. find the book we're talking about using getOneById()
		const keyToUpdate = Object.keys(updateBody);
		const valueToUpdate = Object.values(updateBody);
		//2. Return the values of the book
		const sql = `
            UPDATE books
            SET ($1) = ($2)
            WHERE id = ($3)
            RETURNING *;
        `;
		dbClient
			.query(sql, [...keyToUpdate, ...valueToUpdate, bookId])
			.then((resp) => {
				callback(resp.rows[0]);
			})
			.catch(console.error);
	}

	createTable();
	mockData();

	return { getAll, getOneById, creatOne, updateById };
}

module.exports = Book;
