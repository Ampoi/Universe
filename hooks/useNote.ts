import { notesRepository } from "~/infra/notesRepository"
import { useAuth } from "./useAuth"
import { notesCollection } from "~/infra/notesCollection"

import { v4 as generateUUID } from "uuid"

import * as druid from "@saehrimnir/druidjs";
import type { NoteWithVector } from "~/models/note";

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

    const getAllNoteStars = async () => {
        const { points } = await notesCollection.getAll({
            filter: {
                must: [
                    {
                        key: "uid",
                        match: {
                            value: uid
                        }
                    }
                ]
            },
            with_payload: false,
            with_vector: true
        })

        const Druid = new druid.TSNE(points.map(point => point.vector))
        const next = Druid.generator()

        let embeds: Float64Array[]
        for( const newEmbeds of next ){ embeds = newEmbeds }

        const notes = points.map((point, i) => {
            const embed = embeds[i]
            return {
                id: point.id,
                x: embed[0],
                y: embed[1]
            }
        })

        return notes
    }

    return { createNote, getAllNoteStars }
}