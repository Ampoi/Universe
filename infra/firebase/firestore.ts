import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { useAuth } from "~/hooks/useAuth"

const db = getFirestore()
const { auth } = useAuth()
if( !auth.currentUser ) throw new Error("ログイン中のユーザー情報がありません")
const usersRef = doc(db, `users/${auth.currentUser.uid}`)

export const createRepository = <T extends Record<string, any>>(name: string) => {
    const ref = collection(usersRef, name)
    return {
        //async add(value: T){
        //    const doc = await addDoc(ref, value)
        //    return doc
        //},
        async set(id: string, value: T){
            await setDoc(doc(ref, id), value)
        }
    }
}