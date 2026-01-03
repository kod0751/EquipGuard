import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { equipmentMockData } from '@/shared/constants/equipment-mock';
import {
  AVATAR_STYLE_MAP,
  STATUS_STYLE_MAP,
} from '../constants/equipmennt-styles';
import { getWearColor } from '@/shared/constants/wear';

export function EquipmentTable() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-1">설비 상태 모니터링</h2>
        <p className="text-sm text-muted-foreground">
          AI 기반 설비 고장 확률 예측 결과
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-2 text-sm text-muted-foreground">
                설비 ID
              </th>
              <th className="text-left py-3 px-2 text-sm text-muted-foreground">
                유형
              </th>
              <th className="text-left py-3 px-2 text-sm text-muted-foreground">
                고장 확률
              </th>
              <th className="text-left py-3 px-2 text-sm text-muted-foreground">
                상태
              </th>
            </tr>
          </thead>

          <tbody>
            {equipmentMockData.map((equipment) => {
              const percent = Math.round((equipment.expectedWear ?? 0) * 100);

              return (
                <tr key={equipment.id} className="border-b last:border-0">
                  {/* 설비 ID */}
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <Avatar className={`w-9 h-9`}>
                        <AvatarFallback
                          className={AVATAR_STYLE_MAP[equipment.type]}
                        >
                          {equipment.id.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm">
                        {equipment.id}
                      </span>
                    </div>
                  </td>

                  {/* 유형 */}
                  <td className="py-4 px-2 text-sm">{equipment.type}</td>

                  {/* 고장 확률 */}
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-30">
                        <div
                          className={`h-full ${getWearColor(percent)}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium min-w-9">
                        {percent}%
                      </span>
                    </div>
                  </td>

                  {/* 상태 */}
                  <td className="py-4 px-2">
                    <span
                      className={STATUS_STYLE_MAP[equipment.status ?? '정상']}
                    >
                      {equipment.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
