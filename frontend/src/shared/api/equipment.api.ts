import type { Equipment } from '@/shared/types/equipment';
import type { EquipmentFormValues } from '@/features/equipment/schemas/equipment-schema';
import { apiClient } from '../lib/axios';



export const equipmentApi = {
  getList: async (): Promise<Equipment[]> => {
    const { data } = await apiClient.get('/api/prediction/all-status');
    return data;
  },
  create: async (data: EquipmentFormValues): Promise<void> => {
    await apiClient.post('/api/prediction/add', data);
  },
};
