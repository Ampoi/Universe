import { QdrantClient } from "@qdrant/js-client-rest";

const runtimeConfig = useRuntimeConfig()
const qdrantClient = new QdrantClient({
    host: runtimeConfig.public.qdrant.url,
    port: 55000
})

export const createCollection = <T extends Record<string, any>>( collectionName: string ) => {
    type Point = {
        id: string
        vector: number[]
        payload: T
    }

    return {
        async createCollection(){
            await qdrantClient.createCollection(collectionName, {
                vectors: {
                    size: 1536,
                    distance: "Dot"
                }
            })
        },
        async deleteCollection(){
            await qdrantClient.deleteCollection(collectionName)
        },
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