import type { Equipment } from '@/shared/types/equipment';
import { equipmentMockData } from '../constants/equipment-mock';

export const equipmentApi = {
  getList: async (): Promise<Equipment[]> => {
    // mock이라 delay 흉내
    await new Promise((r) => setTimeout(r, 500));
    return equipmentMockData;
  },
};
