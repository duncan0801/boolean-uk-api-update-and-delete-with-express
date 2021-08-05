const express = require("express");
const morgan = require("morgan");

const dbClient = require("./utils/database");

const app = express();

//ROUTERS
const booksRouter = require("./resources/books/router");
const petsRouter = require("./resources/pets/router");

//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());

//ROUTES
app.use("/books", booksRouter);
app.use("/pets", petsRouter);

//INITIALISE SERVER AND CONNECT DB
const port = 4000;
app.listen(port, () => {
	console.log(`Server Running on http://localhost:${port}`);

	dbClient.connect((error) => {
		if (error) {
			console.error("Connection Error:", error);
		} else {
			console.log("DB is connected");
		}
	});
});
