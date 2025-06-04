import type { ResumeComponentType } from '../type/Resume'
import { formFields } from './formFields'

const editorConfigs: Record<ResumeComponentType, { fields: any[] }> = {
    basic: { fields: formFields.basic },
    education: { fields: formFields.education },
    work: { fields: formFields.work },
    project: { fields: formFields.project },
    skills: { fields: formFields.skills }
}

export default editorConfigs 