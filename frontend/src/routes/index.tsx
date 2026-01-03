import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/shared/components/layout/AppLayout';

import { DashboardPage } from '@/feature/dashboard';
import { EquipmentList } from '@/feature/equipment';
import { PredictionPage } from '@/feature/prediction';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/equipment">
          <Route index element={<EquipmentList />} />
          {/* <Route path=":id" element={<EquipmentDetail />} /> */}
        </Route>

        <Route path="/prediction" element={<PredictionPage />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
