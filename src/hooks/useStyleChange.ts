import type { ComponentField } from '../type/Resume'

type EmitType = {
    (e: 'submit', data: ComponentField[]): void
}

export function useStyleChange() {
    const handleStyleChange = (field: ComponentField, fieldsConfig: ComponentField[], emit: EmitType) => {
        // 确保字段的样式属性被正确设置
        if (!field.hasOwnProperty('isBold')) {
            field.isBold = false;
        }
        if (!field.hasOwnProperty('isItalic')) {
            field.isItalic = false;
        }
        if (!field.hasOwnProperty('listStyle')) {
            field.listStyle = 'none';
        }
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
        // Only allow 'none' and 'disc' for listStyle
        const styles: ('none' | 'disc')[] = ['none', 'disc']
        const safeListStyle = styles.includes(field.listStyle as any) ? field.listStyle : 'none'
        const currentIndex = styles.indexOf(safeListStyle as 'none' | 'disc')
        const nextIndex = (currentIndex + 1) % styles.length
        const oldStyle = field.listStyle
        field.listStyle = styles[nextIndex]
        
        console.log(`样式切换: ${oldStyle} -> ${field.listStyle}`)
        
        handleStyleChange(field, fieldsConfig, emit)
    }

    return {
        handleStyleChange,
        toggleBold,
        toggleItalic,
        toggleListStyle
    }
} 