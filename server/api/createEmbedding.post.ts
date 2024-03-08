import { createEmbedding } from "~/infra/embedding"

export default defineEventHandler(async (event) => {
    const { content } = await readBody<{
        content: string
    }>(event)

    const embedding = await createEmbedding(content)

    return embedding
})