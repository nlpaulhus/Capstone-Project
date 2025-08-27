import { Router } from "express";
let router = Router();
import { user_get, network_get } from "../controllers/authControllers.js";

router.get("/", (req, res) => user_get(req, res));
router.get("/network", (req, res) => network_get(req, res));

export default router;
