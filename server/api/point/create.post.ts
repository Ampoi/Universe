import { notesCollection } from "~/infra/notesCollection"

export default defineEventHandler(async (event) => {
    const { id, embedding, uid } = await readBody<{
        id: string,
        embedding: number[],
        uid: string
    }>(event)

    await notesCollection.createPoints({
        id,
        vector: embedding,
        payload: { uid }
    })
})