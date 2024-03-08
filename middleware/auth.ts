import { useAuth } from "../hooks/useAuth"

export default defineNuxtRouteMiddleware(async () => {
    const { auth } = useAuth()
    if( auth.currentUser ){
        return
    }else{
        return navigateTo("/login")
    }
})  