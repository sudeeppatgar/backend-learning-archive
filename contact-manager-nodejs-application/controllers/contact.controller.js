import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contact.model.js";

export const createContact = expressAsyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    const err = new Error("all feilds are required");
    err.statusCode = 401;
    throw err;
  }
  const data = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.user.id,
  });
  res.status(200).json({ data });
});

export const getContacts = expressAsyncHandler(async (req, res) => {
  console.log(req.user.user.id);
  const data = await Contact.find({ user_id: req.user.user.id });
  if (data.length === 0) {
    const err = new Error("no content");
    err.statusCode = 404;
    throw err;
  }

  res.status(200).json({ data });
});

export const getMyContact = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    const err = new Error("contact Not found");
    err.statusCode = 404;
    throw err;
  }
  if (contact.user_id !== req.user.user.id) {
    const err = new Error("user dont haver permission ");
    err.statusCode = 403;
    throw err;
  }
  res.status(200).json({ contact });
});

export const updateContact = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const contactexist = await Contact.findById(id);
  if (!contactexist) {
    const err = new Error("contact Not found");
    err.statusCode = 404;
    throw err;
  }
  if (contactexist.user_id.toString() !== req.user.user.id) {
    const err = new Error("user dont haver permission to update");
    err.statusCode = 403;
    throw err;
  }
  const updatedata = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedata });
});

export const deleteContact = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const contactexist = await Contact.findById(id);
  if (!contactexist) {
    const err = new Error("contac Not found");
    err.statusCode = 404;
    throw err;
  }
  if (contactexist.user_id !== req.user.user.id) {
    const err = new Error("user dont haver permission to delete");
    err.statusCode = 403;
    throw err;
  }
  const deleteContact = await Contact.findByIdAndDelete(id);
  res.status(200).json({ deleteContact });
});
