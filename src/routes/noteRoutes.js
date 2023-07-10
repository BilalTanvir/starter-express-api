const express = require("express");
const { createNote, getNote, deleteNote, updateNote } = require("../controllers/noteController");
const noteRouter = express.Router();
const auth = require("../middlewares/auth")

noteRouter.post("/",auth,createNote);

noteRouter.get("/",auth,getNote);

noteRouter.delete("/:id",auth,deleteNote);

noteRouter.put("/:id",auth,updateNote);

module.exports = noteRouter;