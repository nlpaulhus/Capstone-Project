import { Router } from "express";
let router = Router();
import {
  userservices_get,
  userservices_post,
} from "../controllers/servicesController.js";

router.get("/:userId", (req, res) => userservices_get(req, res));
router.post("/:userId", (req, res) => userservices_post(req, res));

export default router;
