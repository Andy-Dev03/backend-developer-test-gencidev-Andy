const express = require("express");
const router = express.Router();
const NoteController = require("../controllers/noteController");
const { authorization } = require("../middlewares/middleware");

router.post("/", NoteController.createNote);
router.get("/", NoteController.getAllNotes);
router.get("/:id", NoteController.getNoteById);

// Apply authorization middleware
router.put("/:id", authorization, NoteController.updateNote);
router.delete("/:id", authorization, NoteController.deleteNote);

module.exports = router;
