import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  X,
  Lightbulb,
  CheckCircle2,
  Flame,
  Thermometer,
  RotateCcw,
  ChevronsUp,
} from 'lucide-react';
import type { Equipment } from '@/shared/types/equipment';
import { InputDataCard } from './input-data-card';
import { getRiskStatus } from '@/shared/constants/wear';

interface PredictionResultProps {
  equipment: Equipment;
}

const riskVariantMap = {
  긴급: 'urgent',
  주의: 'warning',
  정상: 'normal',
} as const;

export default function PredictionResult({ equipment }: PredictionResultProps) {
  const failureRate = (equipment.expectedError ?? 0) * 100;

  return (
    <div className="space-y-6">
      {/* 설비ID */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {equipment.type} {equipment.id}
            </h2>
          </div>
          <Badge
            variant={riskVariantMap[getRiskStatus(equipment)]}
            className="px-4 py-2 text-base"
          >
            위험도: {getRiskStatus(equipment)}
          </Badge>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* 고장 확률 */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">고장 확률</p>
              <p className="text-2xl font-bold mb-2">{failureRate}%</p>
            </div>
          </div>
        </Card>

        {/* 권장 조치 */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
              <X className="w-6 h-6 text-teal-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">권장 조치</p>
              <p className="text-2xl font-bold mb-1">정기 점검 권장</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 설비 입력 데이터 */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold">설비 입력 데이터</h3>
          <div className="space-y-4">
            <InputDataCard
              label="공기 온도"
              value={equipment.air_temp}
              unit="°K"
              description="24.9°C"
              icon={Thermometer}
            />

            <InputDataCard
              label="공정 온도"
              value={equipment.process_temp}
              unit="°K"
              description="31.9°C"
              icon={Flame}
              iconColorClass="text-orange-500"
              iconBgClass="bg-orange-500/10"
            />

            <InputDataCard
              label="토크"
              value={equipment.torque}
              unit="Nm"
              description="회전력"
              icon={RotateCcw}
              iconColorClass="text-purple-500"
              iconBgClass="bg-purple-500/10"
            />

            <InputDataCard
              label="회전속도"
              value={equipment.rpm}
              unit="rpm"
              description="작동속도"
              icon={ChevronsUp}
              iconColorClass="text-indigo-500"
              iconBgClass="bg-indigo-500/10"
            />
          </div>
        </Card>

        {/* 고장 유형 예측 및 AI분석 */}
        <Card className="p-6">
          <h3 className="text-lg font-bold">고장 유형별 예측</h3>
          <div>
            {equipment.failurePredictions?.map((prediction) => {
              const percent = prediction.probability;

              return (
                <div key={prediction.type} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {prediction.type}
                    </span>
                    <span className="text-sm font-medium">{percent}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={
                          'h-full transition-all bg-linear-to-t from-sky-500 to-indigo-500'
                        }
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI 분석 */}
          <Card className="p-6 bg-blue-500/5 border-blue-200">
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold">AI 권장 사항</h3>
              </div>
              <div className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      진동 수치가 평균보다 높습니다. 베어링 점검을 권장합니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      온도 변화가 감지되었습니다. 냉각 시스템을 확인하세요.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      예상 정비를 통과 고장 확률을 20% 낮출 수 있습니다.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
