import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { Equipment } from '@/shared/types/equipment';

interface PredictionHeaderProps {
  equipmentList: Equipment[];
  selectedEquipmentId: string;
  onEquipmentChange: (id: string) => void;
  onPredictClick: () => void;
}

export default function PredictionHeader({
  equipmentList,
  selectedEquipmentId,
  onEquipmentChange,
  onPredictClick,
}: PredictionHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* 제목 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">설비 고장 예측</h1>
          <p className="text-sm text-slate-500 mt-1">AI 기반 고장 예측 분석</p>
        </div>

        {/* 우측 컨트롤 */}
        <div className="flex items-center gap-4">
          {/* 설비 선택 */}
          <Select
            value={selectedEquipmentId}
            onValueChange={onEquipmentChange}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="설비를 선택하세요" />
            </SelectTrigger>
            <SelectContent className='font-["NanumSquareNeo"]'>
              {equipmentList.map((equipment) => (
                <SelectItem key={equipment.assetId} value={equipment.assetId}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{equipment.assetId}</span>
                    <span className="text-xs text-muted-foreground">
                      ({equipment.type})
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 버튼 */}
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white"
            disabled={!selectedEquipmentId}
            onClick={onPredictClick}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            예측 실행
          </Button>
        </div>
      </div>
    </header>
  );
}