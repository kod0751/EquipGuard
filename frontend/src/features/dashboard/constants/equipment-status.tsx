import type { Equipment } from '@/shared/types/equipment';
import {
  AlertTriangle,
  CheckCircle2,
  Settings,
  AlertCircle,
} from 'lucide-react';

/** 설비 상태 요약 Key */
export type EquipmentStatKey = 'TOTAL' | 'NORMAL' | 'WARNING' | 'URGENT';

type StatusName = '긴급' | '주의' | '정상';

/** 설비 상태 카드 설정 */
export const EQUIPMENT_STATUS: Record<
  EquipmentStatKey,
  {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
  }
> = {
  TOTAL: {
    label: '전체 설비',
    icon: Settings,
    color: 'bg-blue-100 text-blue-500',
  },
  NORMAL: {
    label: '정상 가동',
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-500',
  },
  WARNING: {
    label: '주의 필요',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-500',
  },
  URGENT: {
    label: '긴급 정비',
    icon: AlertCircle,
    color: 'bg-red-100 text-red-500',
  },
};

function getStatusByError(expectedError: number): StatusName {
  if (expectedError >= 0.75) return '긴급';
  if (expectedError >= 0.5) return '주의';
  return '정상';
}

/** 설비 상태 요약 계산 */
export function calcEquipmentStatus(equipments: Equipment[]) {
  return equipments.reduce(
    (acc, cur) => {
      acc.TOTAL += 1;

      const status = getStatusByError(cur.expectedError ?? 0);

      if (status === '정상') acc.NORMAL += 1;
      if (status === '주의') acc.WARNING += 1;
      if (status === '긴급') acc.URGENT += 1;

      return acc;
    },
    {
      TOTAL: 0,
      NORMAL: 0,
      WARNING: 0,
      URGENT: 0,
    }
  );
}
