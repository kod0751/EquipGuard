"use client";

import { useParams, useNavigate } from "react-router-dom"; // 또는 next/navigation
import { useEquipmentListQuery } from "@/shared/api/equipment.query";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import PredictionResult from "../prediction/components/prediction-result";
import { Skeleton } from "@/components/ui/skeleton";

export default function EquipmentDetail() {
  const { id } = useParams(); // URL 파라미터에서 assetId 추출
  const navigate = useNavigate();

  const { data: equipmentList, isLoading } = useEquipmentListQuery();
  const equipment = equipmentList?.find((item) => item.assetId === id);

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        {/* 뒤로가기 버튼 스켈레톤 */}
        <Skeleton className="h-10 w-24 rounded-md" />

        {/* PredictionResult의 전체적인 윤곽을 모사 */}
        <div className="space-y-6">
          {/* 상단 요약 카드 스켈레톤 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-50 rounded-xl" />
            <Skeleton className="h-50 rounded-xl" />
          </div>

          {/* 중앙 상세 데이터 영역 스켈레톤 */}
          <div className="grid gap-6 md:grid-cols-3">
            <Skeleton className="h-75 md:col-span-2 rounded-xl" />
            <Skeleton className="h-75 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }
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
