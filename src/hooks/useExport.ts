//导出
import { toBlob } from 'html-to-image'
import jsPDF from 'jspdf'
// import { saveAs } from 'file-saver'

export const exportPDF = async () => {
  try {
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