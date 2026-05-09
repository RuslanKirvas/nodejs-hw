
import {Router} from 'express'

import {getAllNotes , getNoteById, createNote, deleteNote, updateNote} from '../controllers/notesController.js'
const router =  Router()


router.get("/notes",getAllNotes);

// GET /notes/:noteId - получить одну заметку по ID
router.get("/notes/:noteId", getNoteById );

// POST /notes - создать заметку
router.post("/notes", createNote );

// PATCH /notes/:noteId - обновить заметку
router.patch("/notes/:noteId", updateNote);

// DELETE /notes/:noteId - удалить заметку
router.delete("/notes/:noteId", deleteNote);

export default router;
