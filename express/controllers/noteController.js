const { Note } = require("../models");

class NoteController {
  static async getAllNotes(req, res, next) {
    try {
      const notes = await Note.findAll({
        where: { UserId: req.user.id },
      });

      res.status(200).json({
        statusCode: 200,
        totalData: notes.length,
        data: notes,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getNoteById(req, res, next) {}

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

  static async updateNote(req, res, next) {}

  static async deleteNote(req, res, next) {}
}

module.exports = NoteController;
