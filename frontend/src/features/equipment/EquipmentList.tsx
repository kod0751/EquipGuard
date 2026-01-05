'use client';

import { useState } from 'react';
import { StateCard } from '../dashboard/components/state-card';
import { EquipmentFilterTabs } from './components/equipment-filter';
import { EquipmentManagementTable } from './components/equipment-management-table';
import EquipmentHeader from './components/equipment-header';

export default function EquipmentList() {
  // 필터 상태: 'all', 'normal', 'warning', 'critical' 중 하나
  const [activeFilter, setActiveFilter] = useState('all');

  // 검색어 상태: 사용자가 입력한 검색 텍스트
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <EquipmentHeader />
      <StateCard />
      <EquipmentFilterTabs
        activeTab={activeFilter}
        onTabChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <EquipmentManagementTable
        filter={activeFilter}
        searchQuery={searchQuery}
      />
    </>
  );
}
