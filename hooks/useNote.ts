import { notesRepository } from "~/infra/notesRepository"

export const useNote = () => {
    const createNote = (content: string) => {
        notesRepository.add({
            content,
            createdAt: new Date()
        })
    }

    return { createNote }
}