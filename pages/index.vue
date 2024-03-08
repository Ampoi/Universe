<template>
    <main class="w-screen h-screen bg-black relative">
        <div
            class="absolute w-full h-full top-0 left-0"
            @click="isWriting = !isWriting">
            <div
                class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white font-serif text-5xl text-center"
                v-if="!isWriting">
                Drop your piece of imagination
            </div>
        </div>
        <div
            v-if="isWriting"
            class="absolute w-full top-20 left-0 p-8 flex flex-col gap-4">
            <textarea
                v-model="note"
                class="text-center outline-none bg-transparent text-white basis-20"/>
            <button class="text-white bg-gradient-to-b from-white/15 to-white/10 p-2 border-white/10 border-[1px] rounded-md via-30%">Submit</button>
        </div>
    </main>
</template>
<script setup lang="ts">
const isWriting = ref(false)
const note = ref("")
</script>