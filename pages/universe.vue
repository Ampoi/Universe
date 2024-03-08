<template>
    <main
        class="w-screen h-dvh relative bg-black">
        <div
            class="bg-gradient-to-t from-pink-600 to-transparent transition-all duration-300 w-full h-full absolute top-0 left-0"
            :class="openedSlideIndex == 0 ? 'opacity-40' : 'opacity-0'"/>
        <div
            class="bg-gradient-to-t from-blue-600 to-transparent transition-all duration-300 w-full h-full absolute top-0 left-0"
            :class="openedSlideIndex == 1 ? 'opacity-40' : 'opacity-0'"/>
        <Swiper
            :loop="true"
            :slides-per-view="1"
            @slide-change-transition-end="onSlideChange"
            class="w-full h-full">
            <SwiperSlide class="w-full h-full relative">
                <div
                    class="absolute w-full h-full top-0 left-0"
                    @click="isWriting = !isWriting">
                    <div
                        class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white/10 font-serif text-5xl text-center leading-[56px]"
                        v-if="!isWriting">
                        Drop piece of your imagination
                    </div>
                </div>
                <NoteArea
                    v-if="isWriting"
                    v-model:writing="isWriting"/>
            </SwiperSlide>
            <SwiperSlide>
                vvv
            </SwiperSlide>
        </Swiper>
        <button
            class="grid place-content-center size-12 text-white bg-gradient-to-b from-white/15 to-white/10 border-white/10 border-[1px] rounded-lg via-30% bottom-8 left-4 absolute z-10"
            @click="showModal = true">
            ...
        </button>
        <Modal v-model:show="showModal"/>
    </main>
</template>
<script setup lang="ts">
const isWriting = ref(false)
const showModal = ref(false)
const openedSlideIndex = ref(0)

const onSlideChange = (swiper: any) => {
    isWriting.value = false
    openedSlideIndex.value = swiper.realIndex
}

definePageMeta({
  middleware: ["auth"]
})
</script>