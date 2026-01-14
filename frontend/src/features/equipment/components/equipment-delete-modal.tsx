import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteEquipmentMutation } from "@/shared/api/equipment.query";
import type { Equipment } from "@/shared/types/equipment";
import { toast } from "sonner";

interface EquipmentDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: Equipment | null;
}

export function EquipmentDeleteModal({
  open,
  onOpenChange,
  equipment,
}: EquipmentDeleteModalProps) {
  const deleteMutation = useDeleteEquipmentMutation();

  const handleConfirm = () => {
    if (!equipment) return;

    deleteMutation.mutate(equipment.assetId, {
      onSuccess: () => {
        toast.success(`${equipment.assetId} 설비가 삭제되었습니다.`);
        onOpenChange(false);
      },
      onError: () => {
        toast.error("삭제 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100 font-['NanumSquareNeo']">
        <DialogHeader>
          <DialogTitle>설비 제거</DialogTitle>
          <DialogDescription className="pt-4">
            {equipment && (
              <p className="text-foreground">
                <span className="font-bold">[{equipment.assetId}]</span> 항목을
                정말로 삭제하시겠습니까?
              </p>
            )}
            삭제한 설비는 다시 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "삭제 중..." : "삭제하기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
