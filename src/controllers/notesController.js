import { Note } from "../models/note.js";
import createHttpError from "http-errors";



export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;
    const skip = (page - 1) * perPage;
    const limit = perPage;

    let notesQuery = Note.find();

    if (tag) {
      notesQuery = notesQuery.where("tag").equals(tag);
    }

    if (search) {
      notesQuery = notesQuery.or([
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]);
    }

       const [ totalNotes ,notes ]= await Promise.all([
      notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(limit),

    ])

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      return next(createHttpError(404, `Note with ID: ${noteId} not found`));
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content, tag } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, tag },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedNote) {
      return next(createHttpError(404, `Note with ID: ${noteId} not found`));
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return next(createHttpError(404, `Note with ID: ${noteId} not found`));
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};
