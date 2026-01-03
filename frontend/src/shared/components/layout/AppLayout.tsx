import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-slate-50 font-['NanumSquareNeo']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pathname={location.pathname} />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
