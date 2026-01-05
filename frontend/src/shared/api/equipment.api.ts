import type { Equipment } from '@/shared/types/equipment';
import { equipmentMockData } from '../constants/equipment-mock';
import type { EquipmentFormValues } from '@/features/equipment/schemas/equipment-schema';

export const equipmentApi = {
  getList: async (): Promise<Equipment[]> => {
    // mock이라 delay 흉내
    await new Promise((r) => setTimeout(r, 500));
    return equipmentMockData;
  },
  create: async (data: EquipmentFormValues): Promise<void> => {
    await new Promise((r) => setTimeout(r, 500)); // API 지연 시뮬레이션
    console.log('API 서버로 데이터 전송 완료:', data);
    
    // await axios.post('/api/equipment', data);
  },
};
