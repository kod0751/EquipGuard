import { Card } from '@/components/ui/card';
import {
  calcEquipmentStatus,
  EQUIPMENT_STATUS,
} from '../constants/equipment-status';
import { useEquipmentListQuery } from '@/shared/api/equipment.query';

export function StateCard() {
  const { data, isLoading, error } = useEquipmentListQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>데이터를 불러올 수 없습니다.</div>;

  const equipmentStatus = calcEquipmentStatus(data ?? []);

  return (
    <section className='p-8 pb-0'>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(equipmentStatus).map(([key, value]) => {
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
