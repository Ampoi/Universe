<template>
    <div v-if="showNoteModalID">
        <div
            class="absolute left-0 top-0 h-full w-full"
            @click="emit('update:showNoteModalID', undefined)"/>
        <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] h-[calc(100%-128px)] glass-block px-6 py-8 rounded-3xl backdrop-blur-md grid place-content-center">
            <div
                class="text-center"
                v-if="note">
                <h2 class="text-xl text-white">{{ note.content }}</h2>
                <p class="text-sm">{{ note.createdAt }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useNote } from '~/hooks/useNote';
import { format } from "@formkit/tempo"

const props = defineProps<{
    showNoteModalID?: string
}>()

const note = ref<{
    content: string
    createdAt: string
} | undefined>()

const { get } = useNote()
watch(() => props.showNoteModalID, async (id) => {
    if( !id ){
        note.value = undefined
        return
    }

    const newNote = await get(id)
    note.value = {
        content: newNote.content,
        createdAt: format(newNote.createdAt.toDate(), "YYYY年MM月DD日 H:mm")
    }
})

const emit = defineEmits<{
    (e: "update:showNoteModalID", value: undefined): void
}>()
</script>