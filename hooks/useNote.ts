import { notesRepository } from "~/infra/notesRepository"
import { useAuth } from "./useAuth"

export const useNote = () => {
    const { auth } = useAuth()
    if( !auth.currentUser ) throw new Error("ログインしていません")
    const { uid } = auth.currentUser

    const createNote = async (content: string) => {
        const doc = await notesRepository.add({
            content,
            createdAt: new Date()
        })
        const embedding = await $fetch("/api/createEmbedding", {
            method: "POST",
            body: { content }
        })
        console.log(embedding)
    }

    return { createNote }
}