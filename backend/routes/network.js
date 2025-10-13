import { Router } from "express";
let router = Router();
import {
  network_post,
  network_get,
} from "../controllers/projectsController.js";

router.post("/", (req, res) => network_post(req, res));
router.get("/user", (req, res) => network_get(req, res));

export default router;
