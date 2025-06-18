import type { ResumeComponent } from "../type/Resume"

export const saveData = async (componentList:ResumeComponent[],saveResume:Function,currentResumeId:string,currentResumeTitle:string) => {
    // 处理图片URL
    const processedFields = await Promise.all(componentList.map(async comp => {
        if (!comp.fields) return []
        return Promise.all(comp.fields.map(async field => {
            if (field.type === 'image' && field.value) {
                if (field.value.length > 1000) {
                    field.value = await compressImageUrl(field.value)
                }
            }
            // 转换为普通对象
            return JSON.parse(JSON.stringify(field))
        }))
    })).then(fields => fields.flat())
    if(currentResumeTitle === ''){
        currentResumeTitle = '未命名简历'
    }
    const resumeData = {
        id: currentResumeId,
        userId: 'user123',
        content: JSON.parse(JSON.stringify(componentList)),
        title: currentResumeTitle
    }
    console.log(resumeData,'resumeData')
    try {
        await saveResume(resumeData)
    } catch (error: any) {
        console.error('Save failed:', error.response?.data || error)
    }
}
  
// 图片URL压缩函数
const compressImageUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
  
    // 创建canvas来压缩图片
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
  
            // 设置最大尺寸
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;
  
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
  
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
  
            // 压缩为较低质量的JPEG
            resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.src = URL.createObjectURL(blob);
    });
}
  