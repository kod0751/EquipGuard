import axios from 'axios';

// 환경변수에서 API URL 가져오기
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // 쿠키/세션 사용시
});


// // ### 로컬 개발용 (`.env.local` 또는 `.env`):
// VITE_API_URL=http://localhost:8000


// ### Vercel 배포용:
// Settings → Environment Variables에서:
// VITE_API_URL=https://your-backend-url.com