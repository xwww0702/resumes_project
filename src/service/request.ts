import request from "./api";
import type { ResumeComponent } from "../type/Resume";

export function getResume(id: string, signal?: AbortSignal) {
  return request.get(`http://localhost:3001/resume/${id}`, { signal });
}

export function saveResumeRequest(
  id: string,
  content: ResumeComponent[],
  userId: string,
  title: string,
  signal?: AbortSignal
) {
  return request.post(
    "http://localhost:3001/resume",
    { id, content, userId, title },
    { signal }
  );
}

export function getAllResume(userId: string, signal?: AbortSignal) {
  return request.get(`http://localhost:3001/api/resumes/${userId}`, { signal });
}
export function deleteResume(id: string, userId: string) {
  return request.delete(`http://localhost:3001/resume/${id}`, {
    params: { userId },
  });
}
