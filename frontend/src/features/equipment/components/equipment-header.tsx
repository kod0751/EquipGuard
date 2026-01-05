import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EquipmentHeader() {
  const handleAddEquipment = () => {
    console.log('설비 추가');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">설비 관리</h1>
          <p className="text-sm text-slate-500 mt-1">
            전체 설비 현황 및 상태 관리
          </p>
        </div>

        <Button
          className="bg-teal-500 hover:bg-teal-600 text-white"
          onClick={handleAddEquipment}
        >
          <Plus className="w-4 h-4 mr-2" />
          설비 추가
        </Button>
      </div>
    </header>
  );
}