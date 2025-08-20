import { Router } from "express";
let router = Router();
import { services_get } from "../controllers/servicesController.js";

router.get("/", (req, res) => services_get(req, res));

export default router;
