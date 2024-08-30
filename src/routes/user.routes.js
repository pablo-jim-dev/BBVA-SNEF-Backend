import { Router } from "express";
const router = Router();
import {
    register,
    score,
    users,
    checkin
} from "../controllers/user.controllers.js";

router.post("/", register);
router.patch("/", score);
router.post("/users", users);
router.patch("/checkin", checkin);

export default router;