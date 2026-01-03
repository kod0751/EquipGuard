import { Download, Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  pathname: string;

  onPredictClick?: () => void;
}

const headerConfig = {
  '/dashboard': {
    title: '대시보드',
    subtitle: '기기 상태 모니터링',
    icon: Download,
    label: '리포트 다운로드',
  },
  '/equipment': {
    title: '설비 관리',
    subtitle: '전체 설비 현황 및 상태 관리',
    icon: Plus,
    label: '설비 추가',
  },
  '/prediction': {
    title: '설비 고장 예측',
    subtitle: 'AI 기반 고장 예측 분석',
    icon: TrendingUp,
    label: '예측 실행',
  },
} as const;

export default function Header({ pathname, onPredictClick }: HeaderProps) {
  const basePath = '/' + pathname.split('/')[1];
  const config = headerConfig[basePath as keyof typeof headerConfig];
  const isPredictionPage = basePath === '/prediction';

  const ButtonIcon = config?.icon ?? Download;

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* 제목 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {config?.title ?? '고장 예측 시스템'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {config?.subtitle ?? ''}
          </p>
        </div>

        {/* 우측 버튼 */}
        {config && (
          <Button
            className="bg-teal-500 hover:bg-teal-600 text-white"
            onClick={
              isPredictionPage
                ? onPredictClick
                : () => console.log(config.label)
            }
          >
            <ButtonIcon className="w-4 h-4 mr-2" />
            {config.label}
          </Button>
        )}
      </div>
    </header>
  );
}
