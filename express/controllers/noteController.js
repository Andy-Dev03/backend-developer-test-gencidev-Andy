const { Note } = require("../models");

class NoteController {
  static async getAllNotes(req, res, next) {
    try {
      const notes = await Note.findAll({
        where: { UserId: req.user.id },
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        totalData: +notes.length,
        data: notes,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getNoteById(req, res, next) {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(+id);

      if (!note) {
        throw new Error("Note_Not_Found");
      }

      res.status(200).json({
        statusCode: 200,
        data: note,
      });
    } catch (err) {
      next(err);
    }
  }

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

  static async updateNote(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const note = await Note.findOne({
        where: { id: +id, UserId: req.user.id },
      });

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

  static async deleteNote(req, res, next) {}
}

module.exports = NoteController;
