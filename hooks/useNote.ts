import { notesRepository } from "~/infra/notesRepository"
import { useAuth } from "./useAuth"
import { notesCollection } from "~/infra/notesCollection"

import { v4 as generateUUID } from "uuid"

export const useNote = () => {
    const { auth } = useAuth()
    if( !auth.currentUser ) throw new Error("ログインしていません")
    const { uid } = auth.currentUser

    const createNote = async (content: string) => {
        const id = generateUUID()
        const [embedding] = await Promise.all([
            await $fetch("/api/createEmbedding", {
                method: "POST",
                body: { content }
            }),
            await notesRepository.set(id, {
                content,
                createdAt: new Date()
            })  
        ])

        await notesCollection.createPoints({
            id,
            vector: embedding,
            payload: { uid }
        })
    }

    const getAllNotes = async () => {
        return await notesCollection.getAll({
            must: [
                { uid }
            ],
            with_payload: false,
            with_vector: true
        })
    }

    return { createNote, getAllNotes }
}