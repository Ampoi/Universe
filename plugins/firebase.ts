import { initializeApp, getApps } from "firebase/app";

export default defineNuxtPlugin(() => {
    const { firebaseConfig } = useRuntimeConfig().public
    if( getApps().length == 0 ){
        initializeApp(firebaseConfig)
    }
})