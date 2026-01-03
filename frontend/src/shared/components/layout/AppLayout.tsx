import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

import type { Equipment } from '@/shared/types/equipment';
import { equipmentMockData } from '@/shared/constants/equipment-mock';

export function AppLayout() {
  const location = useLocation();

  // 선택된 설비 ID (Header Select)
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');

  // 예측 결과 (지금은 mock)
  const [predictedEquipment, setPredictedEquipment] =
    useState<Equipment | null>(null);

  // 예측 실행 (나중에 ML API로 대체)
  const handlePredict = () => {
    const equipment = equipmentMockData.find(
      (item) => item.id === selectedEquipmentId
    );

    if (!equipment) return;

    // 지금은 그냥 목데이터를 "예측 결과"로 사용
    setPredictedEquipment(equipment);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-['NanumSquareNeo']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          pathname={location.pathname}
          equipmentList={equipmentMockData}
          selectedEquipmentId={selectedEquipmentId}
          onEquipmentChange={(id) => {
            setSelectedEquipmentId(id);
            setPredictedEquipment(null);
          }}
          onPredictClick={handlePredict}
        />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet
            context={{
              predictedEquipment,
            }}
          />
        </main>
      </div>
    </div>
  );
}
