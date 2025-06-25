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
            const {  canvas } = cropperRef.value.getResult()
            const croppedImage = canvas.toDataURL()
            emit(croppedImage)
            showCropper.value = false
        }
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
        imageStyle,
        handleFileChange,
        handleCrop,
    }
} 