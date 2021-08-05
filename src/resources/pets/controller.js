//This is where the functions that will be give to the roots will go
const Pet = require("./model");
const { getAll } = Pet();

function getAllPets(req, res) {
	getAll(pets => {
        res.json({pets: pets})
    })
}

module.exports = getAllPets;
