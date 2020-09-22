import express from "express";
import { signin, signout } from "../controllers/auth.controller";

const router = express.Router();

// @desc   signs in users
// @route  /api/auth/signin
router.post("/signin", signin);

// @desc   signs out users
// @route  /api/auth/signout
router.get("/signout", signout);

export default router;
