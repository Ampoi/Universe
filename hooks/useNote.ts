import { notesRepository } from "~/infra/notesRepository"
import { useAuth } from "./useAuth"

import { v4 as generateUUID } from "uuid"

import * as druid from "@saehrimnir/druidjs";
import type { NoteStar } from "~/models/note";

export const useNote = () => {
    const { auth } = useAuth()
    if( !auth.currentUser ) throw new Error("ログインしていません")
    const { uid } = auth.currentUser

    const create = async (content: string) => {
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

        await $fetch("/api/point/create", {
            method: "POST",
            body: { id, embedding, uid }
        })
    }

    const get = async (id: string) => {
        const note = await notesRepository.get(id)
        return note
    }

    const getAllStars = async (): Promise<NoteStar[]> => {
        const points = await $fetch("/api/point/getAll", {
            method: "POST",
            body: { uid }
        }) as {
            id: string | number
            vector: number[]
        }[]

        if( points.length == 0 ){
            return []
        }else if( points.length == 1 ){
            const point = points[0]
            if( typeof point.id != "string" ) throw new Error("idがStringじゃないです！")
            return [
                {
                    id: point.id,
                    x: 0,
                    y: 0
                }
            ]
        }else{
            const Druid = new druid.TSNE(points.map(point => point.vector))
            const next = Druid.generator()

            let embeds: Float64Array[]
            for( const newEmbeds of next ){ embeds = newEmbeds }

            const notes = points.map((point, i) => {
                const embed = embeds[i]
                if( typeof point.id != "string" ) throw new Error("idがStringじゃないです！")
                return {
                    id: point.id,
                    x: embed[0],
                    y: embed[1]
                }
            })

            return notes
        }
    }

    const search = async (prompt: string) => {
        const noteIDs = await $fetch("/api/point/search", {
            method: "POST",
            body: { prompt }
        })

        const notes = await Promise.all(noteIDs.map(async (id) => await get(id)))

        return notes
    }

    return { create, get, getAllStars, search }
}