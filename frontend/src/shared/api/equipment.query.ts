import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { equipmentApi } from "./equipment.api";
import { equipmentKeys } from "./equipment.keys";
import type { Equipment } from "../types/equipment";
import { toast } from "sonner";

export const useEquipmentListQuery = () =>
  useQuery({
    queryKey: equipmentKeys.list(),
    queryFn: equipmentApi.getList,
  });

export const useCreateEquipmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentApi.create,
    onSuccess: () => {
      toast.success("설비가 성공적으로 추가되었습니다.");
      queryClient.invalidateQueries({ queryKey: equipmentKeys.list() });
    },
    onError: () => {
      toast.error("설비 추가에 실패했습니다.");
    },
  });
};

// 상세 분석 데이터 조회 (예측 실행 시 사용)
export const usePredictMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (equipmentData: Equipment) =>
      equipmentApi.analyze(equipmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.list() });
    },
  });
};

// 설비 데이터 삭제
export const useDeleteEquipmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: equipmentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: equipmentKeys.list() });
    },
    onError: (error) => {
      console.error("설비 삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    },
  });
};
