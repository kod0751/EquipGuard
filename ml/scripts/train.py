from integrated_system import FailureDetectionSystem, FailureCauseAnalyzer

def run_training():
    # 1. 1차 모델 학습 및 저장
    detector = FailureDetectionSystem()
    detector.train('data/raw/machine_failure.csv')
    detector.save_model('models/failure_model.pkl')
    
    # 2. 2차 모델 학습 및 저장
    analyzer = FailureCauseAnalyzer()
    analyzer.train('data/raw/machine_failure.csv')
    analyzer.save_model('models/cause_analyzer.pkl')
    
    print("\n✨ 모든 모델 학습 및 저장 완료!")

if __name__ == "__main__":
    run_training()