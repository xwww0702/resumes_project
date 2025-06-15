import { defineStore } from "pinia";
import { ref } from "vue";
import type { ComponentField } from "../type/Resume";

export const useEditStore = defineStore('edit', () => {
    const fieldsConfig = ref<ComponentField[]>([])

    return {
        fieldsConfig
    }
})