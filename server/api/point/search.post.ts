import { createEmbedding } from "~/infra/embedding"
import { notesCollection } from "~/infra/notesCollection"

export default defineEventHandler(async (event) => {
    const { prompt } = await readBody<{
        prompt: string
    }>(event)

    const embedding = await createEmbedding(prompt)

    const noteIDs = (await notesCollection.searchSimilar(embedding, 5)).map((point) => {
        if( typeof point.id != "string" ) throw new Error("IDが文字じゃないです！")
        return point.id
    })

    return noteIDs
})