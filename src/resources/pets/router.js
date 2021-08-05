// This is where the roots go
const express = require("express");
const getAllPets = require("./controller");
	// getOnePetById,
	// createOnePet,
	// updatePetById,
    // deletePetById


const router = express.Router();

router.get("/", getAllPets);
// router.get("/:id", getOnePetById);
// router.post("/", createOnePet);
// router.patch("/:id", updatePetById);
// router.delete("/:id", deletePetById)

module.exports = router;
