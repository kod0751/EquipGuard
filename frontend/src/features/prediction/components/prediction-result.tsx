import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
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

const getRecommendedAction = (riskStatus: string) => {
  const actions = {
    긴급: {
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-500/10',
      title: '즉시 점검 필요',
      description: '설비 가동 중단 후 긴급 점검이 필요합니다',
    },
    주의: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      title: '정기 점검 권장',
      description: '가까운 시일 내 점검을 권장합니다',
    },
    정상: {
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
      title: '정상 작동 중',
      description: '설비가 정상적으로 작동하고 있습니다',
    },
  };

  return actions[riskStatus as keyof typeof actions] || actions.정상;
};

export default function PredictionResult({ equipment }: PredictionResultProps) {
  const failureRate = (equipment.expected_error ?? 0) * 100;
  const riskStatus = getRiskStatus(equipment);
  const action = getRecommendedAction(riskStatus);
  const ActionIcon = action.icon;

  console.log(equipment)
  return (
    <div className="space-y-6">
      {/* 설비ID */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {equipment.type} {equipment.assetId}
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
            <div
              className={`w-12 h-12 rounded-xl ${action.bgColor} flex items-center justify-center shrink-0`}
            >
              <ActionIcon className={`w-6 h-6 ${action.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">권장 조치</p>
              <p className="text-2xl font-bold mb-1">{action.title}</p>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
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
            {equipment.failure_predictions?.map((prediction) => {
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
                      {equipment.aiRecommendations[0]}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {equipment.aiRecommendations[1]}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      {equipment.aiRecommendations[2]}
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
