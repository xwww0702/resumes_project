import { ref } from "vue"

export const scale = ref(0.7)
export const minScale = 0.5
export const maxScale = 1.5
export const scaleStep = 0.1


export const zoomIn = () => {
    if (scale.value < maxScale) {
        scale.value = Math.min(scale.value + scaleStep, maxScale)
    }
}

export const zoomOut = () => {
    if (scale.value > minScale) {
        scale.value = Math.max(scale.value - scaleStep, minScale)
    }
}

export const resetZoom = () => {
    scale.value = 1
}

export const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        if (e.deltaY < 0) {
            if (scale.value < maxScale) {
                scale.value = Math.min(scale.value + scaleStep, maxScale)
            }
        } else {
            if (scale.value > minScale) {
                scale.value = Math.max(scale.value - scaleStep, minScale)
            }
        }
    }
}