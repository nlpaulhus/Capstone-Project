import { Router } from "express";
let router = Router();
import { profile_get } from "../controllers/authControllers.js";

router.get("/:listingid", (req, res) => profile_get(req, res));

export default router;
