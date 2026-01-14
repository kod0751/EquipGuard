import { useState } from "react";
import {
  useEquipmentListQuery,
  usePredictMutation,
} from "@/shared/api/equipment.query";
import { PredictionEmpty } from "./components/prediction-empty";
import PredictionResult from "./components/prediction-result";
import PredictionHeader from "./components/prediction-header";
import { PredictionLoading } from "./components/predcition-loading";
import { Skeleton } from "@/components/ui/skeleton";

export default function PredictionPage() {
  const { data: equipmentList, isLoading: isListLoading } =
    useEquipmentListQuery(); //
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    mutate: predict,
    data: resultData,
    isPending: isAnalyzing,
  } = usePredictMutation();

  const handlePredict = () => {
    const selectedEquipment = equipmentList?.find(
      (e) => e.assetId === selectedId
    );
    if (selectedEquipment) {
      predict(selectedEquipment);
    }
    console.log(selectedEquipment);
  };

  const handleEquipmentChange = (id: string) => {
    setSelectedId(id);
    // 선택 변경 시 이전 결과 초기화 로직은 필요에 따라 추가
  };

  if (isListLoading) {
    return (
      <header className="bg-white border-b border-slate-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-52" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <PredictionHeader
        equipmentList={equipmentList ?? []}
        selectedEquipmentId={selectedId}
        onEquipmentChange={handleEquipmentChange}
        onPredictClick={handlePredict}
      />
      <div className="flex-1 overflow-y-auto p-8">
        {isAnalyzing ? (
          <PredictionLoading /> // 1. 분석 중 화면
        ) : resultData ? (
          <PredictionResult equipment={resultData} /> // 2. 결과 화면 (서버에서 받은 ML 데이터)
        ) : (
          <PredictionEmpty /> // 3. 초기 안내 화면
        )}
      </div>
    </div>
  );
}
