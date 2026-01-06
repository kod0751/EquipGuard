import type { Equipment } from '@/shared/types/equipment';
import type { EquipmentFormValues } from '@/features/equipment/schemas/equipment-schema';
import { apiClient } from '../lib/axios';



export const equipmentApi = {
  getList: async (): Promise<Equipment[]> => {
    const { data } = await apiClient.get('/api/prediction/all-status');
    return data;
  },
  create: async (data: EquipmentFormValues): Promise<void> => {
    await new Promise((r) => setTimeout(r, 500)); // API 지연 시뮬레이션
    console.log('API 서버로 데이터 전송 완료:', data);
    
    // await axios.post('/api/equipment', data);
  },
};
