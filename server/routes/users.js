import express from "express";
import {
  getUser,
  getUserFreinds,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/frineds", verifyToken, getUserFreinds);


/* UPDATE */
router.patch("/:id/:frinedId", verifyToken, addRemoveFriend);

export default router;