import type { Equipment } from '@/shared/types/equipment';

type StatusName = '긴급' | '주의' | '정상';

interface ChartData {
  name: StatusName;
  value: number;
  color: string;
  [key: string]: string | number;
}

const STATUS_COLOR: Record<StatusName, string> = {
  긴급: 'oklch(63.7% 0.237 25.331)',
  주의: 'oklch(85.2% 0.199 91.936)',
  정상: 'oklch(72.3% 0.219 149.579)',
};

function getStatusByError(expectedError: number): StatusName {
  if (expectedError >= 0.75) return '긴급';
  if (expectedError >= 0.5) return '주의';
  return '정상';
}

export function EquipmentData(equipments: Equipment[]): ChartData[] {
  const countMap: Record<StatusName, number> = {
    긴급: 0,
    주의: 0,
    정상: 0,
  };

  equipments.forEach((equipment) => {
    const status = getStatusByError(equipment.expectedError ?? 0);
    countMap[status] += 1;
  });

  return (Object.keys(countMap) as StatusName[]).map((status) => ({
    name: status,
    value: countMap[status],
    color: STATUS_COLOR[status],
  }));
}
