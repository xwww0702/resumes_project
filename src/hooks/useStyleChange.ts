import { ref } from 'vue'
import type { ComponentField } from '../type/Resume'

type EmitType = {
    (e: 'submit', data: ComponentField[]): void
}

export function useStyleChange() {
    const handleStyleChange = (field: ComponentField, fieldsConfig: ComponentField[], emit: EmitType) => {
        // 确保字段的样式属性被正确设置
        field.isBold = field.isBold || false
        field.isItalic = field.isItalic || false
        emit('submit', fieldsConfig)
    }

    const toggleBold = (field: ComponentField, fieldsConfig: ComponentField[], emit: EmitType) => {
        field.isBold = !field.isBold
        handleStyleChange(field, fieldsConfig, emit)
    }

    const toggleItalic = (field: ComponentField, fieldsConfig: ComponentField[], emit: EmitType) => {
        field.isItalic = !field.isItalic
        handleStyleChange(field, fieldsConfig, emit)
    }

    return {
        handleStyleChange,
        toggleBold,
        toggleItalic
    }
} 