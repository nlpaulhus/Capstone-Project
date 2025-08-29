import { Router } from "express";
let router = Router();
import { logout_get } from "../controllers/authControllers.js";

router.get("/", (req, res) => logout_get(req, res));

export default router;
