import { useQuery } from '@tanstack/react-query';
import { equipmentApi } from './equipment.api';
import { equipmentKeys } from './equipment.keys';

export const useEquipmentListQuery = () =>
  useQuery({
    queryKey: equipmentKeys.list(),
    queryFn: equipmentApi.getList,
  });
