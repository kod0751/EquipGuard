import { useState } from 'react';
import type { Equipment } from '@/shared/types/equipment';
import { equipmentMockData } from '@/shared/constants/equipment-mock';

import { PredictionEmpty } from './components/prediction-empty';
import PredictionResult from './components/prediction-result';
import PredictionHeader from './components/prediction-header';

export default function PredictionPage() {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');
  const [predictedEquipment, setPredictedEquipment] = useState<Equipment | null>(null);

  const handlePredict = () => {
    const equipment = equipmentMockData.find(
      (item) => item.id === selectedEquipmentId
    );
    if (equipment) {
      setPredictedEquipment(equipment);
    }
  };

  const handleEquipmentChange = (id: string) => {
    setSelectedEquipmentId(id);
    setPredictedEquipment(null); // 설비 변경 시 예측 결과 초기화
  };

  return (
    <div className="h-full flex flex-col">
      <PredictionHeader
        equipmentList={equipmentMockData}
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