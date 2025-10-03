import { Router } from "express";
let router = Router();
import {
  user_get,
  network_get,
  useredit_get,
  edituser_post,
} from "../controllers/authControllers.js";

router.get("/", (req, res) => user_get(req, res));
router.get("/network", (req, res) => network_get(req, res));
router.get("/edit", (req, res) => useredit_get(req, res));
router.post("/edit", (req, res) => edituser_post(req, res));

export default router;
