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
        async getAll(filter: Record<string, any>){
            return await qdrantClient.scroll(collectionName, {
                filter
            })
        }
    }
}