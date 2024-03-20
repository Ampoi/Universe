import { QdrantClient } from "@qdrant/js-client-rest";

export const createCollection = <T extends Record<string, any>>( collectionName: string ) => {
    const { url, apiKey } = useRuntimeConfig().qdrant
    const qdrantClient = new QdrantClient({
        url,
        apiKey
    })

    type Point = {
        id: string
        vector: number[]
        payload: T
    }

    return {
        async createPoints(...points: Point[]){
            await qdrantClient.upsert(collectionName, {
                points
            })
        },
        async getAll(setting: Record<string, any>){
            return await qdrantClient.scroll(collectionName, setting)
        },
        async searchSimilar(
            vector: number[],
            limit: number
        ){
            return await qdrantClient.search(collectionName, {
                vector,
                limit
            })
        }
    }
}