import { Loader2 } from 'lucide-react';

export function PredictionLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full bg-white rounded-xl border border-dashed border-slate-300">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-teal-500 animate-spin" strokeWidth={1.5} />
        <div className="absolute text-xs font-bold text-teal-600">AI</div>
      </div>
      <h2 className="text-xl font-bold mt-6 text-slate-900">분석 엔진 가동 중</h2>
      <p className="text-slate-500 mt-2 text-center">
        ML 모델이 설비 데이터를 기반으로<br />
        고장 확률 및 유형을 분석하고 있습니다.
      </p>
    </div>
  );
}