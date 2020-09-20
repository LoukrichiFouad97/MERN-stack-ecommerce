import express from "express";
import { userSignInValidator, validate } from "../validators/user_validator";

const router = express.Router();

// Controllers
import { signIn, signOut } from "../controllers/auth.controller";

// Routes
router.post("/signin", userSignInValidator(), validate, signIn);
router.get("/signout", signOut);

export default router;
