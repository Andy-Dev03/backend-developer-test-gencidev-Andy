const express = require("express");
const router = express.Router();
const NoteController = require("../controllers/noteController");
const { authorization } = require("../middlewares/middleware");

// Post /api/notes
router.post("/", NoteController.createNote);

// Get /api/notes
router.get("/", NoteController.getAllNotes);

// Get /api/notes/:id
router.get("/:id", NoteController.getNoteById);

// Apply authorization middleware
// Put /api/notes/:id
router.put("/:id", authorization, NoteController.updateNote);

// Delete /api/notes/:id
router.delete("/:id", authorization, NoteController.deleteNote);

module.exports = router;
