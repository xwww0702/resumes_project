<script setup lang="ts">
import { ref } from 'vue'
import type { ResumeComponent } from './type/Resume'
import Nav from './components/Nav.vue';
import ResumeCompPart from './components/ResumeCompPart.vue'
import ResumePreview from './components/ResumePreview.vue'
import { useComponentStore } from './store/useComponentStore'

const asideWidth = ref(300)
const isDragging = ref(false)
const previewRef = ref()
const store = useComponentStore()

const handleMouseDown = (e: MouseEvent) => {
    isDragging.value = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.value) {
        const newWidth = e.clientX
        if (newWidth >= 200 && newWidth <= 500) { 
            asideWidth.value = newWidth
        }
    }
}

const handleMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
}

const handleEdit = (component: ResumeComponent) => {
    store.selectComponent(component)
}

</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header class="nav-wrapper">
                <Nav></Nav>
            </el-header>
            <el-container class="main-container">
                <el-aside :width="`${asideWidth}px`" class="resize-aside">
                    <ResumeCompPart />
                </el-aside>
                <div class="resize-handle" @mousedown="handleMouseDown"></div>
                <el-main>
                    <ResumePreview 
                        ref="previewRef"
                        @edit="handleEdit"
                    />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout {
    height: 100vh;
    overflow: hidden;
}

.nav-wrapper {
    width: 100vw;
    margin: 0;
    padding: 0;
}

.main-container {
    position: relative;
    height: calc(100vh - 60px);
}

.resize-aside {
    transition: width 0.1s;
    overflow: hidden;
}

.resize-handle {
    position: absolute;
    left: v-bind('asideWidth + "px"');
    top: 0;
    width: 4px;
    height: 100%;
    background-color: transparent;
    cursor: col-resize;
    z-index: 100;
    transition: background-color 0.3s;
}

.resize-handle:hover,
.resize-handle:active {
    background-color: #409eff;
}

:deep(.el-container) {
    height: 100%;
}

:deep(.el-aside) {
    height: calc(100vh - 60px);
    overflow: hidden;
}

:deep(.el-main) {
    height: calc(100vh - 60px);
    overflow: hidden;
}
</style>
