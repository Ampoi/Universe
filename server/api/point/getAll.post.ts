import { notesCollection } from "~/infra/notesCollection"

export default defineEventHandler(async (event) => {
    const { uid, limit } = await readBody<{
        limit: number
        uid: string
    }>(event)

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
        limit,
        with_payload: false,
        with_vector: true
    })

    return points
})