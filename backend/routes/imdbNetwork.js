import { Router } from "express";
let router = Router();
import { imdbNetwork_post } from "../controllers/projectsController.js";

router.post("/", (req, res) => imdbNetwork_post(req, res));

export default router;
