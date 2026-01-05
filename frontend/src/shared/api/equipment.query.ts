import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { equipmentApi } from './equipment.api';
import { equipmentKeys } from './equipment.keys';

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
  });
};