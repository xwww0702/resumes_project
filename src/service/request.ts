import request from './api'
import type { ResumeComponent } from '../type/Resume'

export function saveResume(id: string, content: ResumeComponent[], userId: string, signal?: AbortSignal) {
  return request.post('/resume', { id, content, userId }, { signal })
}

export function getResume(id: string, signal?: AbortSignal) {
  return request.get(`/resume/${id}`, { signal })
}