import { Router } from "express";
let router = Router();
import { search_get } from "../controllers/servicesController.js";

router.get("/:servicename", (req, res) => search_get(req, res));

export default router;
