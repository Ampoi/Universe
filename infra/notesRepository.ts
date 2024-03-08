import { createRepository } from "./firebase/firestore";
import type { Note } from "~/models/note";

export const notesRepository = createRepository<Note>("notes")