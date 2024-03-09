<template>
    <div
        v-if="show"
        class="absolute top-0 left-0 w-screen h-dvh z-20">
        <div
            class="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md"
            @click="show = false"/>
        <div class="text-white bg-gradient-to-b from-white/15 to-white/10 border-white/10 border-[1px] absolute bottom-0 left-0 w-full z-10 p-4 pb-12 rounded-t-3xl">
            <div class="p-4 bg-white/5 border-white/10 border-[1px] rounded-xl">
                <div
                    v-if="user"
                    class="flex flex-row gap-4 items-center">
                    <div
                        :style="{ backgroundImage: `url(${user.photoURL ?? 'https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51'})`}"
                        class="rounded-full size-16 bg-cover bg-center"/>
                    <div class="flex flex-col grow max-w-[calc(100%-4px-32px-4rem-2.5rem)] overflow-hidden">
                        <h2 class="text-xl font-semibold text-nowrap text-ellipsis overflow-hidden">{{ user.displayName }}</h2>
                        <p class="text-white/40 text-sm text-nowrap text-ellipsis overflow-hidden">{{ user.email }}</p>
                    </div>
                    <button
                        class="bg-white/5 border-white/10 border-[1px] rounded-md size-10 grid place-content-center"
                        @click="logout">
                        <Icon
                            name="bi:box-arrow-right"
                            class="text-lg"/>
                    </button>
                </div>
                <div
                    v-else
                    class="flex flex-row gap-4 items-center">
                    hey! you are't logged in!!
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAuth } from '~/hooks/useAuth'

const show = defineModel<boolean>("show")

const { auth, logout } = useAuth()
const user = auth.currentUser
</script>