import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Wrench, AlertTriangle, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    icon: BarChart3,
    label: '대시보드',
    path: '/dashboard',
  },
  {
    icon: Wrench,
    label: '설비 관리',
    path: '/equipment',
  },
  {
    icon: AlertTriangle,
    label: '설비 고장 예측',
    path: '/prediction',
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-55 bg-slate-900 text-white flex flex-col">
      {/* 로고 */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <Cog className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base">고장 예측</h1>
            <p className="text-xs text-slate-400">AI System</p>
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-teal-500 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
