//导出
import type { ResumeComponent } from '../type/Resume'
// import { saveAs } from 'file-saver'

export const exportPDF = async () => {
  try {
    const [{ toBlob }, { default: jsPDF }] = await Promise.all([
      import('html-to-image'),
      import('jspdf')
    ])

    const container = document.getElementById('resume-preview')!
    
    // 生成图片 Blob
    const blob = await toBlob(container, {
      type: 'image/jpeg',
      cacheBust: true,
      canvasHeight: container.clientHeight,
      canvasWidth: container.clientWidth,
    })

    if (!blob) throw new Error('导出失败：无法生成图片')

    // 创建 Image 对象，读取 Blob 的尺寸
    const img = new Image()
    img.src = URL.createObjectURL(blob)
    img.onload = () => {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [img.width, img.height], // 适配大小
      })

      pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height)
      pdf.save('resume.pdf')
    }
  } catch (err: any) {
    console.error('导出失败:', err)
  }
}

export const exportJSON = (data:ResumeComponent[]) => {
  // 获取当前简历内容
  // 转为 JSON 字符串并格式化
  const jsonStr = JSON.stringify(data, null, 2)
  // 创建 Blob
  const blob = new Blob([jsonStr], { type: 'application/json' })
  // 创建下载链接
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = ('resume') + '.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}