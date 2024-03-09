<template>
    <div
        class="absolute w-full top-1/2 -translate-y-1/2 left-0 p-4 flex flex-col gap-4">
        <textarea
            v-model="note"
            class="text-center outline-none bg-transparent text-white basis-20 resize-none"
            ref="noteArea"/>
        <button
            class="text-white bg-gradient-to-b from-white/15 to-white/10 p-2 border-white/10 border-[1px] rounded-lg via-30%"
            @click="submit">
            Submit
        </button>
    </div>
</template>
<script setup lang="ts">
import { useNote } from '~/hooks/useNote';

const isWriting = defineModel<boolean>("writing", { required: true })
const note = ref("")

const { createNote } = useNote()

const noteArea = ref<HTMLTextAreaElement>()
onMounted(() => {
    noteArea.value?.focus()
})

function submit(){
    if( note.value == "" ) return
    createNote(note.value)
    note.value = ''
    isWriting.value = false
}
</script>