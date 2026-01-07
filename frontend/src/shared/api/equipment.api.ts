import type { Equipment } from '@/shared/types/equipment';
import type { EquipmentFormValues } from '@/features/equipment/schemas/equipment-schema';
import { apiClient } from '../lib/axios';



export const equipmentApi = {
  // 전체 목록 조회
  getList: async (): Promise<Equipment[]> => {
    const { data } = await apiClient.get('/api/prediction/all-status');
    return data;
  },

  // 설비 등록/수정
  create: async (data: EquipmentFormValues): Promise<void> => {
    await apiClient.post('/api/prediction/add', data);
  },

  // 상세 분석 데이터 조회
  getDetail: async (assetId: string): Promise<Equipment> => {
    const { data } = await apiClient.get(`/api/prediction/${assetId}`);
    return data;
  },

  analyze: async (equipmentData: Equipment): Promise<Equipment> => {
    // 백엔드의 /add 엔드포인트는 ML 분석 로직을 포함하고 있으므로 이를 활용합니다.
    const { data } = await apiClient.post('/api/prediction/add', equipmentData);
    return data;
  },
};
