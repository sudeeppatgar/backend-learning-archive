import { Router } from "express";
import contactRoutes from "./contact.route.js";
import userRoutes from "./user.route.js";
const router = Router();

router.use("/contacts", contactRoutes);
router.use("/users", userRoutes);

export default router;
