import type { Timestamp } from "firebase/firestore"

export type NoteStar = {
    id: string
    x: number
    y: number
}

export type Note = {
    content: string
    createdAt: Timestamp
}