import { notesCollection } from "~/infra/notesCollection"

export default defineEventHandler(async (event) => {
    const { uid } = await readBody<{
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
        with_payload: false,
        with_vector: true
    })

    return points
})