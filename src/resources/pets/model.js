// This is where our table schema and query function go
const dbClient = require("../../utils/database");
const { buildAnimalDatabase } = require("../../utils/mockData");

function Pet() {
	function createTable() {
		const sql = `
        DROP TABLE IF EXISTS pets;

        CREATE TABLE IF NOT EXISTS pets (
            id              SERIAL       PRIMARY KEY,
            name            VARCHAR(255) NOT NULL,
            age             INTEGER      NOT NULL,
            type            VARCHAR(255) NOT NULL,
            breed           VARCHAR(255) NOT NULL,
            microchip       BOOLEAN      NOT NULL
        );
        `;
		dbClient
			.query(sql)
			.then(() => console.log("Pets table CREATED"))
			.catch((error) => console.log(error));
	}
	function mockData() {
		const sql = `
            INSERT INTO pets
                (name, age, type, breed, microchip)
            VALUES
            ($1, $2, $3, $4, $5);
        `;

		const animals = buildAnimalDatabase();

		animals.forEach((animal) => {
			const { name, age, type, breed, microchip } = animal;
			dbClient
				.query(sql, [name, age, type, breed, microchip])
				.then()
				.catch(console.error);
		});
	}
	function getAll(callback) {
		const sql = `
        SELECT * FROM pets;
        `;
		dbClient
			.query(sql)
			.then((result) => {
				console.log(result.rows);
				callback(result.rows);
			})
			.catch(console.error);
	}

	createTable();
	mockData();

	return { getAll };
}

module.exports = Pet;
