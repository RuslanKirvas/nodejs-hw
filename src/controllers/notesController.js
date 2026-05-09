
import { Note } from "../models/note.js";
import createHttpError from "http-errors";
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById =  async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        message: `Note with ID: ${noteId} not found`
      });
    }

    req.log.info(`GET /notes/${noteId} request received`);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote =async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content, tag } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(

     {_id: noteId},
      { title, content, tag },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedNote) {
      // return res.status(404).json({ message: `Note with ID: ${noteId} not found` });
      // throw new Error(`Note with ID: ${noteId} not found`)
      throw createHttpError(404, `Note with ID: ${noteId} not found`)
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

 export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deletedNote = await Note.findByIdAndDelete({_id: noteId});



    if (!deletedNote) {
      // return res.status(404).json({ message: `Note with ID: ${noteId} not found` });
      throw createHttpError (404, `Note with ID: ${noteId} not found`);

    }

    res.status(200).json({ message: "Note deleted successfully", note: deletedNote });
  } catch (error) {
    next(error);
  }
}

