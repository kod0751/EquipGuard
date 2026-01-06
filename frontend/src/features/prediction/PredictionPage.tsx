import { useState } from 'react';
import type { Equipment } from '@/shared/types/equipment';

import { PredictionEmpty } from './components/prediction-empty';
import PredictionResult from './components/prediction-result';
import PredictionHeader from './components/prediction-header';
import { useEquipmentListQuery } from '@/shared/api/equipment.query';

export default function PredictionPage() {
  const { data, isLoading, error } = useEquipmentListQuery();

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');
  const [predictedEquipment, setPredictedEquipment] = useState<Equipment | null>(null);

  const handlePredict = () => {
    const equipment = data?.find(
      (item) => item.assetId === selectedEquipmentId
    );
    if (equipment) {
      setPredictedEquipment(equipment);
    }
  };

  const handleEquipmentChange = (id: string) => {
    setSelectedEquipmentId(id);
    setPredictedEquipment(null); // 설비 변경 시 예측 결과 초기화
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>데이터를 불러올 수 없습니다.</div>;
  
  return (
    <div className="h-full flex flex-col">
      <PredictionHeader
        equipmentList={data ?? []}
        selectedEquipmentId={selectedEquipmentId}
        onEquipmentChange={handleEquipmentChange}
        onPredictClick={handlePredict}
      />
      <div className="flex-1 overflow-y-auto p-8">
        {!predictedEquipment ? (
          <PredictionEmpty />
        ) : (
          <PredictionResult equipment={predictedEquipment} />
        )}
      </div>
    </div>
  );
}