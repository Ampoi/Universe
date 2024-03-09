<template>
    <div
        class="absolute -translate-x-1/2 -translate-y-1/2"
        :style="{
            left: `calc(${(star.x - starCenter.x) * magnificationRate}px + 50%)`,
            top:  `calc(${(star.y - starCenter.y) * magnificationRate}px + 50%)`,
        }">
        <p
            v-if="showText"
            class="text-white text-center">{{ note ? note.content : "undefined!!!" }}</p>
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
}>()

const starSize = computed(() => {
    const size = props.magnificationRate ** 0.5
    const min = 1
    return size < min ? min : size
})

const showText = computed(() => {
    if( !props.movableArea ) throw new Error("MovableAreaが存在しません");

    const isInScreen = (
        (props.star.x - props.starCenter.x) * props.magnificationRate <= starSize.value + props.movableArea.clientWidth / 2 &&
        (props.star.y - props.starCenter.y) * props.magnificationRate <= starSize.value + props.movableArea.clientHeight / 2
    )

    return isInScreen && 15 < starSize.value
})

const note = ref<Note>()
const { getNote } = useNote()
watch(showText, async (newValue) => {
    if( newValue ){
        note.value = await getNote(props.star.id)
    }
})
</script>