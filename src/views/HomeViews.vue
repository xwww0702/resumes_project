<script lang='ts' setup>
import ResumeCompPart from '../components/ResumeCompPart.vue'
import ResumePreview from '../components/ResumePreview.vue'
import { useComponentStore } from '../store/useComponentStore'
import { ref } from 'vue'
import type { ResumeComponent } from '../type/Resume'

const asideWidth = ref(500)
const previewRef = ref()
const store = useComponentStore()


const handleEdit = (component: ResumeComponent) => {
    store.selectComponent(component)
}

import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query.id) 
</script>



<template>

<el-container class="main-container">
                <el-aside :width="`${asideWidth}px`" class="resize-aside">
                    <ResumeCompPart />
                </el-aside>
                <div class="resize-handle" ></div>
                <el-main>
                    <ResumePreview 
                        ref="previewRef"
                        @edit="handleEdit"
                        :id="route.query.id as string"
                    />
                </el-main>
</el-container>

</template>



<style>

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