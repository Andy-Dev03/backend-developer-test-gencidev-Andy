const { Note } = require("../models");

class NoteController {
  // Get all notes
  static async getAllNotes(_req, res, next) {
    try {
      const notes = await Note.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        message: "Notes fetched successfully",
        totalData: notes.length,
        data: notes,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get note by ID
  static async getNoteById(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(+id);

      if (!note) {
        throw new Error("Note_Not_Found");
      }

      res.status(200).json({
        statusCode: 200,
        message: "Note fetched successfully",
        data: note,
      });
    } catch (err) {
      next(err);
    }
  }

  // Create a new note
  static async createNote(req, res, next) {
    try {
      const { title, content } = req.body;
      const currentUser = req.user.id;

      const newNote = await Note.create({
        title,
        content,
        UserId: currentUser,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Note created successfully",
        data: newNote,
      });
    } catch (err) {
      next(err);
    }
  }

  // Update a note
  static async updateNote(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const note = await Note.findByPk(+id);

      if (!note) {
        throw new Error("Note_Not_Found");
      }

      await note.update({
        title,
        content,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Note updated successfully",
        data: note,
      });
    } catch (err) {
      next(err);
    }
  }

  // Delete a note
  static async deleteNote(req, res, next) {
    try {
      const { id } = req.params;

      const note = await Note.findByPk(+id);

      if (!note) {
        throw new Error("Note_Not_Found");
      }

      await note.destroy();

      res.status(200).json({
        statusCode: 200,
        message: "Note deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NoteController;
