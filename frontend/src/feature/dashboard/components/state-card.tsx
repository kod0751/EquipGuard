import { Card } from '@/components/ui/card';
import { equipmentMockData } from '@/shared/constants/equipment-mock';
import {
  calcEquipmentStatus,
  EQUIPMENT_STATUS,
} from '../constants/equipment-status';

export function StateCard() {
  const kpis = calcEquipmentStatus(equipmentMockData);

  return (
    <section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(kpis).map(([key, value]) => {
          const status = EQUIPMENT_STATUS[key as keyof typeof EQUIPMENT_STATUS];
          const Icon = status.icon;

          return (
            <Card key={key} className="p-6 font-['NanumSquareNeo']">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${status.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-muted-foreground">
                    {status.label}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
