const router = require("express").Router();
const {
	userSignUpValidator,
	userSignInValidator,
	validate,
} = require("../validators/user_validator");

// Controllers
const {
	signUp,
	signIn,
	getAllUsers,
	updateUser,
	getUserById,
	deleteUser,
	signOut,
} = require("../controllers/user_controller");

router.post("/signup", userSignUpValidator(), validate, signUp);
router.post("/signin", userSignInValidator(), validate, signIn);
router.get("/signout", signOut);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router;
