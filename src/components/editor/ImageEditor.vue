<script setup lang="ts">
import type { ComponentField } from '../../type/Resume'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { useImageEditor } from '../../hooks/useImageEditor'

interface Props {
    field: ComponentField
    value: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'update', value: string): void
    (e: 'update:alignment', value: 'left' | 'right'): void
}>()

const {
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
} = useImageEditor(props.field)
</script>

<template>
    <div class="w-full">
        <div class="mb-4 border border-dashed border-gray-300 rounded-md overflow-hidden" :style="imageStyle">
            <img v-if="value" :src="value" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50">
                <input
                    type="file"
                    accept="image/*"
                    class="absolute w-full h-full opacity-0 cursor-pointer"
                    @change="handleFileChange"
                />
                <span class="text-gray-500">点击上传图片</span>
            </div>
        </div>
        <div v-if="value" class="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-md">
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-600">宽度 (px)</label>
                <el-input-number
                    v-model="imageSize.width"
                    :min="50"
                    :max="500"
                    @update:modelValue="(val: number) => handleSizeChange('width', val)"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-600">高度 (px)</label>
                <el-input-number
                    v-model="imageSize.height"
                    :min="50"
                    :max="500"
                    @update:modelValue="(val: number) => handleSizeChange('height', val)"
                />
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-sm text-gray-600">对齐方式</label>
                <el-radio-group v-model="alignment" @change="(val: 'left' | 'right') => handleAlignmentChange(val, (v) => emit('update:alignment', v))">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                </el-radio-group>
            </div>

            <el-button @click="showCropper = true">重新裁剪</el-button>
        </div>

        <el-dialog
            v-model="showCropper"
            title="裁剪图片"
            width="600px"
            :close-on-click-modal="false"
        >
            <div class="h-[400px] bg-gray-50">
                <Cropper
                    ref="cropperRef"
                    :src="imageUrl"
                    :stencil-props="{
                        aspectRatio: 1
                    }"
                />
            </div>
            <template #footer>
                <el-button @click="showCropper = false">取消</el-button>
                <el-button type="primary" @click="() => handleCrop((v) => emit('update', v))">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.image-editor {
    width: 100%;
}

.image-preview {
    margin-bottom: 16px;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    overflow: hidden;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.upload-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #fafafa;
}

.file-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.upload-text {
    color: #8c8c8c;
}

.image-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
}

.toolbar-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.toolbar-section label {
    font-size: 14px;
    color: #606266;
}

.cropper-container {
    height: 400px;
    background-color: #f5f5f5;
}
</style> 