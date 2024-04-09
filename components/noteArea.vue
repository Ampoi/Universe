<template>
    <TransitionRoot
        enter="transition-all duration-200"
        enter-from="opacity-0 blur-xl"
        enter-to="opacity-100 blur-none"
        leave="transition-all duration-200"
        leave-from="opacity-100 blur-none"
        leave-to="opacity-0 blur-xl"
        @after-enter="noteArea?.focus()"
        :show="isWriting"
        class="absolute w-full top-1/2 -translate-y-1/2 left-0 p-4 flex flex-col items-center"
        as="div">
        <textarea
            v-model="note"
            class="glass-block px-4 py-6 text-center outline-none !text-white basis-60 resize-none w-full bg-transparent !rounded-xl"
            ref="noteArea"/>
        <button
            class="glass-block grid place-content-center py-2 px-6 font-serif italic text-lg -mt-4 backdrop-blur-lg"
            @click="submit">
            Submit
        </button>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { TransitionRoot } from "@headlessui/vue"
import { useNote } from '~/hooks/useNote';

const isWriting = defineModel<boolean>("writing", { required: true })
const note = ref("")

const { create: createNote } = useNote()

const noteArea = ref<HTMLTextAreaElement>()

function submit(){
    if( note.value == "" ) return
    createNote(note.value)
    note.value = ''
    isWriting.value = false
}
</script>