import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon: LucideIcon;
  iconColorClass?: string;
  iconBgClass?: string;
}

export function InputDataCard({
  label,
  value,
  unit,
  description,
  icon: Icon,
  iconColorClass = 'text-red-500',
  iconBgClass = 'bg-red-500/10',
}: MetricCardProps) {
  return (
    <Card className="p-5 bg-gray-50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBgClass}`}
          >
            <Icon className={`w-6 h-6 ${iconColorClass}`} />
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-bold">
              {value}
              {unit && <span className="ml-1">{unit}</span>}
            </p>
          </div>
        </div>

        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </Card>
  );
}
