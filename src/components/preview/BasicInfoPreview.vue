<template>
    <div class="basic-info-preview">
        <div class="preview-header">
            <h2>基本信息</h2>
        </div>
        <div class="preview-content">
            <div class="info-item">
                <span class="label">姓名：</span>
                <span class="value">张三</span>
            </div>
            <div class="info-item">
                <span class="label">年龄：</span>
                <span class="value">25岁</span>
            </div>
            <div class="info-item">
                <span class="label">电话：</span>
                <span class="value">138****8888</span>
            </div>
            <div class="info-item">
                <span class="label">邮箱：</span>
                <span class="value">example@email.com</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.basic-info-preview {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0;
    /* margin-bottom: 40px; */
    cursor: default;
    transition: none;
}

.basic-info-preview:hover {
    transform: none;
    box-shadow: none;
}

.preview-header h2 {
    font-size: 20px;
    color: #333;
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
    font-weight: bold;
}

.info-item {
    display: flex;
    margin-bottom: 15px;
}

.label {
    width: 80px;
    color: #666;
    font-weight: 500;
}

.value {
    color: #333;
    flex: 1;
}
</style> 