import DashboardHeader from "./components/dashboard-header";
import { EquipmentTable } from "./components/equipment-table";
import { RiskChart } from "./components/risk-chart";
import { StateCard } from "./components/state-card";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <StateCard />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px] p-8">
        <EquipmentTable />
        <RiskChart />
      </div>
    </>
  );
}
