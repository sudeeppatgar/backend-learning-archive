import { Router } from "express";
import {
  createContact,
  deleteContact,
  getContacts,
  getMyContact,
  updateContact,
} from "../controllers/contact.controller.js";
import { validateToken } from "../middlewares/validatetokenHandler.js";

const router = Router();

router.use(validateToken);

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getMyContact).put(updateContact).delete(deleteContact);

export default router;
