<template>
    <div
        class="absolute w-full flex flex-col rounded-b-3xl z-20 transition-all duration-300 bg-black"
        :class="{
            '-translate-y-[calc(100vh-10rem)]': !isLookingUp
        }">
        <div class="h-[calc(100vh-10rem)] w-full relative">
            <div
                v-for="star in noteStars"
                class="size-0.5 rounded-full absolute bg-white -translate-x-1/2 -translate-y-1/2"
                :style="{
                    left: `calc(${star.x}px + 50%)`,
                    top: `calc(${star.y}px + 50%)`
                }"/>
        </div>
        <button
            class="font-serif text-white/30 italic text-2xl py-4"
            @click="isLookingUp = !isLookingUp">
            look up
        </button>
    </div>
</template>
<script setup lang="ts">
import { useNote } from '~/hooks/useNote';

const isLookingUp = defineModel<boolean>("show", { required: true })

const { getAllNoteStars } = useNote()
const noteStars = ref<{
    id: string | number;
    x: number;
    y: number;
}[]>([])

watch(isLookingUp, async (newValue) => {
    if( newValue ){
        noteStars.value = await getAllNoteStars()
    }
})
</script>