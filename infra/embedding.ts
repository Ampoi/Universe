import { openai } from "./openai";

export async function createEmbedding(content: string){
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: content,
        encoding_format: "float"
    })

    return embedding.data[0].embedding
}