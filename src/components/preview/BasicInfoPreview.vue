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
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 15px;
    cursor: move;
    transition: all 0.3s;
}

.basic-info-preview:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.preview-header h2 {
    font-size: 16px;
    color: #333;
    margin: 0 0 10px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
}

.info-item {
    display: flex;
    margin-bottom: 8px;
}

.label {
    width: 60px;
    color: #666;
}

.value {
    color: #333;
}
</style> 