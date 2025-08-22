import { Router } from "express";
let router = Router();
import { login_post } from "../controllers/authControllers.js";

router.post("/", (req, res) => login_post(req, res));

export default router;
