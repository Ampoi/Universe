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
        class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full px-4"
        as="div">
        <div class="w-full h-60 relative">
            <textarea
                v-model="note"
                class="absolute top-0 left-0 glass-block px-4 py-6 text-center outline-none !text-white resize-none h-full w-full bg-transparent !rounded-xl"
                ref="noteArea"/>
            <button
                class="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-block grid place-content-center py-2 px-6 font-serif italic text-lg -mt-4 backdrop-blur-lg"
                v-if="note != ''"
                @click="submit">
                Submit
            </button>
        </div>
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