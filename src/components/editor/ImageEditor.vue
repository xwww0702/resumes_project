<script setup lang="ts">
import type { ComponentField } from "../../type/Resume";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useImageEditor } from "../../hooks/useImageEditor";
import Upload from "../icons/Upload.vue";

interface Props {
  field: ComponentField;
  value: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update", value: string): void;
  (e: "update:alignment", value: "left" | "right"): void;
}>();

const {
  showCropper,
  cropperRef,
  imageUrl,
  imageStyle,
  handleFileChange,
  handleCrop,
} = useImageEditor(props.field);
</script>

<template>
  <div class="w-full">
    <div
      class="mb-4 border border-dashed border-gray-300 rounded-md overflow-hidden"
      :style="imageStyle"
    >
      <img v-if="value" :src="value" class="w-full h-full object-cover" />
      <div
        v-else
        class="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-4"
      >
        <div class="upload-button">
          <input
            type="file"
            accept="image/*"
            class="file-input"
            @change="handleFileChange"
          />
          <el-icon class="text-2xl text-gray-400 mb-2"><Upload /></el-icon>
        </div>
      </div>
    </div>

    <el-button type="primary" size="small" @click="showCropper = true"
      >重新裁剪</el-button
    >
    <el-button
      v-if="value"
      type="danger"
      size="small"
      @click="$emit('update', '')"
      >删除图片</el-button
    >

    <el-dialog
      v-model="showCropper"
      title="裁剪图片"
      width="50%"
      :close-on-click-modal="false"
    >
      <div class="h-[400px] bg-gray-50">
        <Cropper
          ref="cropperRef"
          :src="imageUrl"
          :stencil-props="{
            aspectRatio: 0.7,
          }"
        />
      </div>
      <template #footer>
        <el-button @click="showCropper = false">取消</el-button>
        <el-button
          type="primary"
          @click="() => handleCrop((v) => emit('update', v))"
          >确定</el-button
        >
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

.upload-button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #f0f0f0;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
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
