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
        field.listStyle = field.listStyle || 'none'
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

    const toggleListStyle = (field: ComponentField, fieldsConfig: ComponentField[], emit: EmitType) => {
        const styles: ('none' | 'disc' | 'decimal')[] = ['none', 'disc', 'decimal']
        const currentIndex = styles.indexOf(field.listStyle || 'none')
        const nextIndex = (currentIndex + 1) % styles.length
        field.listStyle = styles[nextIndex]
        handleStyleChange(field, fieldsConfig, emit)
    }

    return {
        handleStyleChange,
        toggleBold,
        toggleItalic,
        toggleListStyle
    }
} 