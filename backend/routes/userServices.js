import { Router } from "express";
let router = Router();
import { userservices_get } from "../controllers/servicesController.js";

router.get("/:userId", (req, res) => userservices_get(req, res));

export default router;
