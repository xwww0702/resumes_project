import { ref, computed } from 'vue'
import type { ComponentField } from '../type/Resume'

export function useImageEditor(field: ComponentField) {
    const showCropper = ref(false)
    const cropperRef = ref()
    const imageUrl = ref(field.value || '')

    const imageSize = ref({
        width: 100,
        height: 100
    })

    const alignment = ref<'left' | 'right'>(field.alignment || 'left')

    const handleFileChange = (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                imageUrl.value = e.target?.result as string
                showCropper.value = true
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCrop = (emit: (value: string) => void) => {
        if (cropperRef.value) {
            const { coordinates, canvas } = cropperRef.value.getResult()
            const croppedImage = canvas.toDataURL()
            emit(croppedImage)
            showCropper.value = false
        }
    }

    const handleSizeChange = (type: 'width' | 'height', value: number) => {
        imageSize.value[type] = value
        // 保持宽高比
        if (type === 'width') {
            imageSize.value.height = Math.round(value * (imageSize.value.height / imageSize.value.width))
        } else {
            imageSize.value.width = Math.round(value * (imageSize.value.width / imageSize.value.height))
        }
    }

    const handleAlignmentChange = (value: 'left' | 'right', emit: (value: 'left' | 'right') => void) => {
        alignment.value = value
        emit(value)
    }

    const imageStyle = computed(() => ({
        width: `${imageSize.value.width}px`,
        height: `${imageSize.value.height}px`
    }))

    return {
        showCropper,
        cropperRef,
        imageUrl,
        imageSize,
        alignment,
        imageStyle,
        handleFileChange,
        handleCrop,
        handleSizeChange,
        handleAlignmentChange
    }
} 