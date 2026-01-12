'use client';

import { useParams, useNavigate } from 'react-router-dom'; // 또는 next/navigation
import { useEquipmentListQuery } from '@/shared/api/equipment.query';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import PredictionResult from '../prediction/components/prediction-result';

export default function EquipmentDetail() {
  const { id } = useParams(); // URL 파라미터에서 assetId 추출
  const navigate = useNavigate();
  
  const { data: equipmentList, isLoading } = useEquipmentListQuery();
  const equipment = equipmentList?.find((item) => item.assetId === id);

  if (isLoading) return <div className="p-8">로딩 중...</div>;
  if (!equipment) return <div className="p-8">설비를 찾을 수 없습니다.</div>;

  return (
    <div className="p-8 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
        <ChevronLeft className="w-4 h-4" /> 뒤로가기
      </Button>

      <PredictionResult equipment={equipment} />
    </div>
  );
}