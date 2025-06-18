<script setup lang="ts">

import Nav from './components/Nav.vue';


</script>

<template>
<div class="common-layout">
        <el-container>
            <el-header class="nav-wrapper">
                <Nav></Nav>
            </el-header>
            <router-view />
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

</style>
