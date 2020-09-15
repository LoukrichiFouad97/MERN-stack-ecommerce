const router = require("express").Router();
const { runValidation } = require("../validators/index");
const { userSignUpValidator } = require("../validators/user_validator");

// Controllers
const {
	signUp,
	signIn,
	getAllUsers,
	updateUser,
	getSingalUser,
	deleteUser,
} = require("../controllers/user_controller");

router.post("/signup", userSignUpValidator, runValidation, signUp);
router.post("/signin", signIn);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getSingalUser);
router.get("/", getAllUsers);

module.exports = router;
