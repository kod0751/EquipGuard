import {
  TrendingUp,
  Settings,
  BarChart3,
  FileText,
  ArrowRight,
} from 'lucide-react';

export function PredictionEmpty() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-teal-500/10 mb-8">
          <TrendingUp className="w-16 h-16 text-teal-500" strokeWidth={1.5} />
        </div>

        {/* 제목 */}
        <h2 className="text-2xl font-bold text-foreground mb-3">
          설비 고장 예측
        </h2>

        {/* 설명 */}
        <p className="text-muted-foreground mb-12">
          상단의 설비를 선택하고 '설비 예측' 버튼을 클릭하여
          <br />
          AI 기반 고장 예측 분석을 시작하세요
        </p>

        <div className="flex items-center justify-center gap-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-3">
              <Settings className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-foreground">설비 선택</p>
          </div>

          <ArrowRight className="w-6 h-6 text-muted-foreground -mt-5" />

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-3">
              <BarChart3
                className="w-10 h-10 text-teal-500"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-sm font-medium text-foreground">예측 실행</p>
          </div>

          <ArrowRight className="w-6 h-6 text-muted-foreground -mt-5" />

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-3">
              <FileText
                className="w-10 h-10 text-purple-500"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-sm font-medium text-foreground">결과 확인</p>
          </div>
        </div>
      </div>
    </div>
  );
}
