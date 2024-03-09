<template>
    <div
        class="absolute w-full flex flex-col rounded-b-3xl z-20 transition-all duration-300 bg-black"
        :class="{
            '-translate-y-[calc(100dvh-10rem)]': !isLookingUp
        }">
        <div
            class="h-[calc(100dvh-10rem)] w-full relative overflow-hidden"
            ref="movableArea"
            @touchmove="onTouchMove"
            @touchend="endTouching"
            @touchcancel="endTouching">
            <div
                v-for="star in noteStars"
                class="size-0.5 rounded-full absolute bg-white -translate-x-1/2 -translate-y-1/2"
                :style="{
                    left: `calc(${(star.x - starCenter.x) * magnificationRate}px + 50%)`,
                    top:  `calc(${(star.y - starCenter.y) * magnificationRate}px + 50%)`,
                    scale: starSize.showSize
                }"/>
        </div>
        <button
            class="font-serif text-white/40 italic text-2xl py-4"
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
const starCenter = reactive({x: 0, y: 0})
const magnificationRate = ref(1)
const movableArea = ref<HTMLElement>()
const movableAreaPadding = 80

const starSize = computed(() => {
    const size = magnificationRate.value ** 0.5
    const min = 1
    const max = 10
    return {
        size,
        showSize: size < min ? min : max < size ? max : size
    }
})

watch(isLookingUp, async (newValue) => {
    if( newValue ){
        noteStars.value = await getAllNoteStars()
        if( noteStars.value.length == 0 ) return
        
        const bound = {
            x: {
                max: noteStars.value[0].x,
                min: noteStars.value[0].x
            },
            y: {
                max: noteStars.value[0].y,
                min: noteStars.value[0].y
            }
        }
        
        noteStars.value.forEach(({ x, y }) => {
            if( x < bound.x.min ){
                bound.x.min = x
            }else if( bound.x.max < x ){
                bound.x.max = x
            }
            if( y < bound.y.min ){
                bound.y.min = y
            }else if( bound.y.max < y ){
                bound.y.max = y
            }
        })

        starCenter.x = (bound.x.min + bound.x.max) / 2
        starCenter.y = (bound.y.min + bound.y.max) / 2

        if( !movableArea.value ) throw new Error("移動可能域の要素が取得できません")
        magnificationRate.value = Math.min(
            (movableArea.value.clientWidth - movableAreaPadding*2) / ( bound.x.max - bound.x.min ),
            (movableArea.value.clientHeight - movableAreaPadding*2) / ( bound.y.max - bound.y.min )
        )
    }
})

const touches = ref<TouchList>()

function findTouch(identifier: number, touches: TouchList){
    let touch: Touch | undefined = undefined
    for( let j = 0; j < touches.length; j++ ){
        if(touches[j].identifier == identifier){
            touch = touches[j]
            break
        }
    }
    return touch
}

function onTouchMove(event: TouchEvent){
    event.preventDefault()
    const newTouches = event.touches
    if( touches.value ){
        const toucheMovements: Record<
            "previous" | "following",
            Record<"x" | "y", number>
        >[] = []

        for( let i = 0; i < newTouches.length; i++){
            const newTouch = newTouches[i]
            const touch = findTouch(newTouch.identifier, touches.value)
            if( !touch ) continue
            const previous = {
                x: touch.clientX,
                y: touch.clientY
            }
            const following = {
                x: newTouch.clientX,
                y: newTouch.clientY
            }
            toucheMovements.push({ previous, following })
        }

        if( toucheMovements.length == 1 ){
            starCenter.x -= (toucheMovements[0].following.x - toucheMovements[0].previous.x) / magnificationRate.value
            starCenter.y -= (toucheMovements[0].following.y - toucheMovements[0].previous.y) / magnificationRate.value
        }else if( toucheMovements.length == 2 ){
            const previousLength = Math.sqrt(
                (toucheMovements[1].previous.x - toucheMovements[0].previous.x) ** 2 +
                (toucheMovements[1].previous.y - toucheMovements[0].previous.y) ** 2
            )
            const followingLength = Math.sqrt(
                (toucheMovements[1].following.x - toucheMovements[0].following.x) ** 2 +
                (toucheMovements[1].following.y - toucheMovements[0].following.y) ** 2
            )
            const newMagnificationRate = magnificationRate.value * followingLength / previousLength
            const magnificationRateMax = 400
            const magnificationRateMin = 0.5
            magnificationRate.value =
                newMagnificationRate < magnificationRateMin ?
                    magnificationRateMin :
                    magnificationRateMax < newMagnificationRate ?
                        magnificationRateMax :
                        newMagnificationRate
            console.log(magnificationRate.value)
        }
    }
    touches.value = newTouches
}

function endTouching(){
    touches.value = undefined
}
</script>