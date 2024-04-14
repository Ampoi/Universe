<template>
    <div
        class="absolute -translate-x-1/2 -translate-y-1/2"
        :style="{
            left: `calc(${starRenderPosition.x}px + 50%)`,
            top:  `calc(${starRenderPosition.y}px + 50%)`,
        }"
        v-if="showStar">
        <button
            v-if="showText"
            class="w-52 relative max-h-32 overflow-hidden p-4"
            @click="emit('openStarModal', props.star.id)">
            <div
                class="blur-md w-full h-full absolute top-0 left-0 -z-10 rounded-2xl">
                <div class="backdrop-blur-md w-full h-full"/>
            </div>
            <p class="!text-white text-center w-full h-full">
                {{ note ? note.content : "undefined!!!" }}
            </p>
        </button>
        <div
            v-else
            class="size-0.5 rounded-full bg-white"
            :style="{
                scale: starSize
            }"/>
    </div>
</template>
<script setup lang="ts">
import { useNote } from '~/hooks/useNote';
import type { Note, NoteStar } from '~/models/note';

const props = defineProps<{
    star: NoteStar
    starCenter: Record<"x" | "y", number>
    magnificationRate: number
    movableArea: HTMLElement | undefined
    movableAreaRect: Record<"height" | "width", number>
}>()

const emit = defineEmits<{
    (e: "openStarModal", starID: string): void
}>()

const starRenderPosition = computed(() => {
    return {
        x: (props.star.x - props.starCenter.x) * props.magnificationRate,
        y: (props.star.y - props.starCenter.y) * props.magnificationRate
    }
})

const starSize = computed(() => {
    const size = props.magnificationRate
    const min = 1
    return size < min ? min : size
})

const starMaxRect = {
    height: 128,
    width: 208
} as const

const showStar = computed(() => {
    const { x, y } = starRenderPosition.value
    const showRange = {
        height: (starMaxRect.height + props.movableAreaRect.height) / 2,
        width: (starMaxRect.width + props.movableAreaRect.width) / 2
    } as const
    
    return (
        (-showRange.height <= y && y <= showRange.height) &&
        (-showRange.width <= x && x <= showRange.width)
    )
})

const showText = computed(() => {
    return 8 < starSize.value
})

const note = ref<Note>()
const { get: getNote } = useNote()
watch(showText, async (newValue) => {
    if( newValue ){
        note.value = await getNote(props.star.id)
    }
})
</script>