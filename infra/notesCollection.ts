import { createCollection } from "./qdrant";

export const notesCollection = createCollection<{
    uid: string
}>("embeds")