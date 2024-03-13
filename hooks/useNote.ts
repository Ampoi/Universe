import { notesRepository } from "~/infra/notesRepository"
import { useAuth } from "./useAuth"
import { notesCollection } from "~/infra/notesCollection"

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

        await notesCollection.createPoints({
            id,
            vector: embedding,
            payload: { uid }
        })
    }

    const get = async (id: string) => {
        const note = await notesRepository.get(id)
        return note
    }

    const getAllStars = async (): Promise<NoteStar[]> => {
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
        const vector = await $fetch("/api/createEmbedding", {
            method: "POST",
            body: {
                content: prompt
            }
        })
        
        const notes = await Promise.all((await notesCollection.searchSimilar(vector, 5)).map(async (point) => {
            if( typeof point.id != "string" ) throw new Error("pointのidが文字型じゃないです")
            const note = await get(point.id)
            return note
        }))

        return notes
    }

    return { create, get, getAllStars, search }
}