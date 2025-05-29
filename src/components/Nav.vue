<script lang="ts" setup>

</script>
<template>
    <el-menu class="el-menu-demo custom-menu" mode="horizontal" :ellipsis="false" text-color="#303133">

        <el-menu-item index="0" class="logo-item">
            <img style="width: 30px" src="../assets/logo.png" alt="My logo" />
        </el-menu-item>


        <div class="menu-left-buttons">
            <el-button type="warning" plain>保存</el-button>
            <el-button type="warning">导出 PDF</el-button>
        </div>


        <div class="spacer"></div>


        <el-menu-item index="1">我的简历</el-menu-item>
    </el-menu>
</template>


<style scoped>
.custom-menu {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
}

.menu-left-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-left: 10px;
}

.spacer {
    flex: 1;
}

.logo-item:hover {
    background-color: transparent !important;
}

.custom-menu {
    --el-menu-active-color: #ff5722;
}
</style>