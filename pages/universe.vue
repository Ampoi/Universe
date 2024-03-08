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
                <div
                    v-if="isWriting"
                    class="absolute w-full top-1/2 -translate-y-1/2 left-0 p-4 flex flex-col gap-4">
                    <textarea
                        v-model="note"
                        class="text-center outline-none bg-transparent text-white basis-20"/>
                    <button class="text-white bg-gradient-to-b from-white/15 to-white/10 p-2 border-white/10 border-[1px] rounded-lg via-30%">Submit</button>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                vvv
            </SwiperSlide>
        </Swiper>
        <button
            class="grid place-content-center size-12 text-white bg-gradient-to-b from-white/15 to-white/10 border-white/10 border-[1px] rounded-lg via-30% top-4 left-4 absolute z-10"
            @click="showModal = true">
            ...
        </button>
        <div
            v-if="showModal"
            class="absolute top-0 left-0 w-screen h-screen z-20">
            <div
                class="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md"
                @click="showModal = false"/>
            <div class="text-white bg-gradient-to-b from-white/15 to-white/10 border-white/10 border-[1px] absolute bottom-0 left-0 w-full z-10 p-4 rounded-t-3xl">
                <div class="flex flex-row gap-4 items-center p-4 bg-white/5 border-white/10 border-[1px] rounded-xl">
                    <div class="rounded-full size-16 bg-blue-500 shrink"/>
                    <div class="flex flex-col">
                        <h2 class="text-xl font-semibold">Ampoi</h2>
                        <p class="text-white/40">ampoi@example.com</p>
                    </div>
                    <div class="grow"/>
                    <div class="bg-white/5 border-white/10 border-[1px] rounded-md size-10 grid place-content-center">
                        <Icon
                            name="bi:box-arrow-right"
                            class="text-lg"/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
const isWriting = ref(false)
const note = ref("")

const showModal = ref(false)

definePageMeta({
  middleware: ["auth"]
})
</script>