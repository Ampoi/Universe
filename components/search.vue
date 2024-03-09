<template>
    <div class="grid place-content-center grow relative text-white bg-gradient-to-b from-white/15 to-white/10 border-white/10 border-[1px] rounded-lg via-30%">
        <div
            v-if="searchResults"
            class="absolute w-full -translate-y-[calc(100%+1rem)] max-h-40 overflow-scroll rounded-lg">
            <div class="flex flex-col gap-4 w-full">
                <div
                    v-for="result in searchResults"
                    class="text-white bg-gradient-to-b from-white/15 to-white/10 border-white/10 border-[1px] rounded-lg via-30% basis-12 px-2 flex flex-row items-center">
                    <p class="whitespace-nowrap text-ellipsis overflow-hidden">{{ result.content }}</p>
                </div>
            </div>
        </div>
        <div
            class="flex flex-row gap-2 items-baseline text-white/60"
            v-if="searchPrompt == ''">
            <Icon
                name="bi:search"
                class="text-sm"/>
            <p class="font-serif italic text-xl">Search for memo...</p>
        </div>
        <div class="absolute w-full h-full left-0 top-0 flex flex-row gap-4 items-center">
            <input
                class="outline-none bg-transparent p-4 pr-0 text-center grow h-full"
                type="text"
                v-model="searchPrompt">
            <div class="p-2">
                <button
                    v-if="searchPrompt != ''"
                    class="size-8 bg-white/5 border-white/10 border-[1px] rounded-md grid place-content-center"
                    @click="search">
                    <Icon
                        name="bi:search"
                        class="text-sm"/>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useNote } from '~/hooks/useNote';
import type { Note } from '~/models/note';

const searchPrompt = ref("")
watch(searchPrompt, () => {
    searchResults.value = undefined
})

const { search: searchNote } = useNote()
const searchResults = ref<Note[]>()

const search = async () => {
    searchResults.value = await searchNote(searchPrompt.value)
}
</script>