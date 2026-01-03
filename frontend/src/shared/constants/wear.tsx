import type { Equipment } from '@/shared/types/equipment';

export type RiskStatus = '긴급' | '주의' | '정상';

export function getRiskStatus(equipment: Equipment): RiskStatus {
  if ((equipment.expectedWear ?? 0) >= 0.75) return '긴급';
  if ((equipment.expectedWear ?? 0) >= 0.5) return '주의';
  return '정상';
}

type WearRule = {
  min: number;
  className: string;
};

const WEAR_COLOR_RULES: WearRule[] = [
  { min: 75, className: 'bg-destructive' },
  { min: 50, className: 'bg-yellow-400' },
  { min: 0, className: 'bg-green-500' },
];

export function getWearColor(percent: number): string {
  return (
    WEAR_COLOR_RULES.find((rule) => percent >= rule.min)?.className ??
    'bg-muted'
  );
}
