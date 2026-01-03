import type { EquipmentStatus, EquipmentType } from '@/shared/types/equipment';

export const STATUS_STYLE_MAP: Record<EquipmentStatus, string> = {
  긴급: 'bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium',
  주의: 'bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium',
  정상: 'bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium',
};

export const AVATAR_STYLE_MAP: Record<EquipmentType, string> = {
  '중형 설비': 'bg-primary text-white',
  '대형 설비': 'bg-orange-500 text-white',
  '고성능 설비': 'bg-purple-600 text-white',
};
