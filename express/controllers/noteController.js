const { Note } = require("../models");

class NoteController {
  static async getAllNotes(req, res) {}
  static async getNoteById(req, res) {}
  static async createNote(req, res) {
    const { title, content } = req.body;
    const currentUser = req.newData.id;

    const newNote = await Note.create({ title, content, UserId: currentUser });
    res.status(201).json({
      statusCode: 201,
      message: "Note created successfully",
      data: newNote,
    });
  }
  static async updateNote(req, res) {}
  static async deleteNote(req, res) {}
}

module.exports = NoteController;
