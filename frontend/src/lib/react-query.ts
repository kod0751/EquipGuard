import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패 시 재시도 횟수
      staleTime: 1000 * 60, // 1분 동안 fresh
      gcTime: 1000 * 60 * 5, // 5분 캐시 유지
      refetchOnWindowFocus: false,
    },
  },
});
