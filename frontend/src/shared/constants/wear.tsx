import type { Equipment } from '@/shared/types/equipment';

export type RiskStatus = '긴급' | '주의' | '정상';

export function getRiskStatus(equipment: Equipment): RiskStatus {
  if ((equipment.expected_error ?? 0) >= 0.75) return '긴급';
  if ((equipment.expected_error ?? 0) >= 0.5) return '주의';
  return '정상';
}

type ErrorRule = {
  min: number;
  className: string;
};

const Error_COLOR_RULES: ErrorRule[] = [
  { min: 75, className: 'bg-destructive' },
  { min: 50, className: 'bg-yellow-400' },
  { min: 0, className: 'bg-green-500' },
];

export function getErrorColor(percent: number): string {
  return (
    Error_COLOR_RULES.find((rule) => percent >= rule.min)?.className ??
    'bg-muted'
  );
}
