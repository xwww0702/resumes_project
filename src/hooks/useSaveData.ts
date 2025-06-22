import { ElMessage } from "element-plus"
import type { ResumeComponent } from "../type/Resume"

export const saveData = async (componentList:ResumeComponent[],saveResume:Function,currentResumeId:string,currentResumeTitle:string) => {
    // 处理图片URL
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
        ElMessage.success('保存成功')
    } catch (error: any) {
        console.error('Save failed:', error.response?.data || error)
        ElMessage.error('保存失败')
    }
}
  

  