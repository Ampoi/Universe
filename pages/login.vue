<template>
    <main class="flex flex-col w-screen">
        <div class="h-screen grid place-content-center">
            <div class="flex flex-col items-center">
                <h1 class="italic font-semibold text-3xl font-serif">To trigger the Big Bang</h1>
                <p class="font-serif text-center">To start using, please login. After that, we will make a Big Bang, and make a universe for you.</p>
                <button
                    class="font-semibold py-2 px-4 bg-black text-white rounded-md mt-4"
                    @click="login">
                    Login with Google
                </button>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { useAuth } from "../hooks/useAuth"

const { login, observeLogin } = await useAuth()
observeLogin(() => {
    const router = useRouter()
    router.push("/universe")
})
</script>