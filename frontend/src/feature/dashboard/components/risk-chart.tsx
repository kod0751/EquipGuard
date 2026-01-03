'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import { equipmentMockData } from '@/shared/constants/equipment-mock';
import { MakeChartData } from '@/shared/utils/MakeChartData';
import { AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ChartData = MakeChartData(equipmentMockData);

export function RiskChart() {
  return (
    <Card className="p-6">
      {/* 차트 제목 영역 */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          고장 위험 분석
        </h3>
        <p className="text-sm text-muted-foreground">위험도별 설비 분포</p>
      </div>

      {/* 위험 분석 차트 */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={ChartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={4}
              cornerRadius={50}
              dataKey="value"
            >
              {ChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* 차트 중앙 전체 설비 수 표시 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-4xl font-bold">{equipmentMockData.length}</div>
          <div className="text-sm text-muted-foreground">전체 설비</div>
        </div>
      </div>

      {/* 위험도별 설비 수 요약 리스트 */}
      <div className="space-y-3 mb-4">
        {ChartData.map((item) => {
          const percentage =
            equipmentMockData.length === 0
              ? 0
              : Math.round((item.value / equipmentMockData.length) * 100);

          return (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.value}대</span>
                <span
                  className="text-sm font-bold text-muted-foreground"
                  style={{ color: item.color }}
                >
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 긴급 상태 설비가 존재할 경우 경고 알림 */}
      {ChartData[0].value > 0 && (
        <Alert className="bg-destructive/10 border-destructive/20">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <AlertDescription>
            <span className="font-semibold text-destructive">
              긴급 조치 필요
            </span>
            <span className="text-destructive/90 text-xs">
              긴급 상태 설비 {ChartData[0].value}대가 점검이 필요합니다.
            </span>
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}
