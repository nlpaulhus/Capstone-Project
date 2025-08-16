import { Router } from "express";
let router = Router();
import { signup_post } from "../controllers/authControllers.js";

router.post("/", (req, res) => signup_post(req, res));

export default router;
