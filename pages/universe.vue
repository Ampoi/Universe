<template>
    <main class="w-screen h-dvh relative bg-gradient-to-t from-blue-950 to-black">
        <LookUp v-model:show="isLookingUp"/>
        <div
            class="absolute w-full h-full top-0 left-0"
            @click="() => {
                if( isLookingUp ){
                    isLookingUp = false
                }else{
                    isWriting = !isWriting
                }
            }">
            <div
                class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white/30 font-serif text-5xl text-center leading-[56px]"
                v-if="!isWriting">
                Click here to drop piece of your imagination
            </div>
        </div>
        <NoteArea
            v-if="isWriting"
            v-model:writing="isWriting"/>
        <div class="bottom-8 absolute z-10 px-4 w-full flex flex-row gap-4 h-12">
            <button
                class="grid place-content-center basis-12 text-white bg-gradient-to-b from-white/15 to-white/10 border-white/10 border-[1px] rounded-lg via-30%"
                @click="showModal = true"
                v-if="!isSearching">
                ...
            </button>
            <Search
                @update-focus="(isFocused) => isSearching = isFocused"/>
        </div>
        <Modal v-model:show="showModal"/>
    </main>
</template>
<script setup lang="ts">
const isWriting = ref(false)
const showModal = ref(false)

const isLookingUp = ref(false)
const isSearching = ref(false)

definePageMeta({
  middleware: ["auth"]
})
</script>