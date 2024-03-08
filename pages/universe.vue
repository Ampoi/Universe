<template>
    <main class="w-screen h-screen relative bg-black">
        <Swiper
            :loop="true"
            :slides-per-view="1"
            @slide-change-transition-end="isWriting = false"
            class="w-full h-full bg-black">
            <SwiperSlide class="w-full h-full relative">
                <div
                    class="absolute w-full h-full top-0 left-0"
                    @click="isWriting = !isWriting">
                    <div
                        class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white font-serif text-5xl text-center"
                        v-if="!isWriting">
                        Drop your piece of imagination
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

definePageMeta({
  middleware: ["auth"]
})
</script>