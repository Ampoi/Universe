import { QdrantClient } from "@qdrant/js-client-rest";

const { url, apiKey } = useRuntimeConfig().public.qdrant
const qdrantClient = new QdrantClient({
    url,
    apiKey,
    port: 443
})

export const createCollection = <T extends Record<string, any>>( collectionName: string ) => {
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