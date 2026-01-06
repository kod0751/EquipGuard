'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { EquipmentData } from '@/shared/utils/EquipmentData';
import { useEquipmentListQuery } from '@/shared/api/equipment.query';

interface EquipmentFilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function EquipmentFilterTabs({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: EquipmentFilterTabsProps) {

  const { data, isLoading, error } = useEquipmentListQuery();

  const tabs = useMemo(() => {
    const equipmentData = EquipmentData(data ?? []);

    // 전체 개수 계산
    const totalCount = equipmentData.reduce((sum, item) => sum + item.value, 0);

    // 상태별 매핑 (긴급 -> critical, 주의 -> warning, 정상 -> normal)
    const statusMap: Record<string, string> = {
      긴급: 'critical',
      주의: 'warning',
      정상: 'normal',
    };

    // 탭 배열 생성
    return [
      { id: 'all', label: '전체', count: totalCount },
      ...equipmentData.map((item) => ({
        id: statusMap[item.name] || item.name,
        label: item.name,
        count: item.value,
      })),
    ];
  }, [data]);

    
  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>데이터를 불러올 수 없습니다.</div>;
  

  return (
    <section className='p-8'>
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2">
        {/* 탭 버튼들 */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)} // 클릭 시 상위 컴포넌트의 상태 변경
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
        <div className="flex-1" />

        {/* 검색 입력창 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="설비 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64 h-9 pl-9 pr-4 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
    </section>
  );
}
