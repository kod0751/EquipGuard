import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { equipmentApi } from './equipment.api';
import { equipmentKeys } from './equipment.keys';
import type { Equipment } from '../types/equipment';

export const useEquipmentListQuery = () =>
  useQuery({
    queryKey: equipmentKeys.list(),
    queryFn: equipmentApi.getList,
  });

export const useCreateEquipmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentApi.create,
    onSuccess: () => {
      // 성공 시 'equipment' 리스트 데이터를 최신화하기 위해 캐시 무효화
      queryClient.invalidateQueries({ queryKey: equipmentKeys.list() });
    },
    onError: (error) => {
      console.error("설비 추가 중 오류 발생:", error);
    }
  });
};

// 상세 분석 데이터 조회 (예측 실행 시 사용)
export const usePredictMutation = () => {
  return useMutation({
    mutationFn: (equipmentData: Equipment) => equipmentApi.analyze(equipmentData),
  });
};