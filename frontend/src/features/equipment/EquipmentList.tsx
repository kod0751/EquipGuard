'use client';

import { useState } from 'react';
import { StateCard } from '../dashboard/components/state-card';
import { EquipmentFilterTabs } from './components/equipment-filter';
import { EquipmentManagementTable } from './components/equipment-management-table';
import EquipmentHeader from './components/equipment-header';
import { EquipmentAddModal } from './components/equipment-add-modal';
import type { Equipment } from '@/shared/types/equipment';
import { EquipmentDeleteModal } from './components/equipment-delete-modal';

export default function EquipmentList() {
  // 필터 상태: 'all', 'normal', 'warning', 'critical' 중 하나
  const [activeFilter, setActiveFilter] = useState('all');

  // 검색어 상태: 사용자가 입력한 검색 텍스트
  const [searchQuery, setSearchQuery] = useState('');

// 모달 관련 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const openDeleteModal = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <EquipmentHeader onOpenModal={() => setIsAddModalOpen(true)} />
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
        onDeleteClick={openDeleteModal}
      />

      <EquipmentAddModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />

      <EquipmentDeleteModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        equipment={selectedEquipment}
      />
    </>
  );
}
