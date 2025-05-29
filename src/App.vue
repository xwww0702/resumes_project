<script setup lang="ts">
import Nav from './components/Nav.vue';
import ResumeCompPart from './components/ResumeCompPart.vue'
import ResumePreview from './components/ResumePreview.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header class="nav-wrapper">
                <Nav></Nav>
            </el-header>
            <el-container>
                <el-aside width="300px">
                    <ResumeCompPart></ResumeCompPart>
                </el-aside>
                <el-main>
                    <ResumePreview></ResumePreview>
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
