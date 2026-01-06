import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
from lightgbm import LGBMClassifier
import joblib
import os

class FailureDetectionSystem:
    """1차 모델: 고장 여부 및 확률 예측"""
    
    def __init__(self):
        self.features = ['air_temp', 'process_temp', 'rpm', 'torque', 'tool_wear',
                         'Temp_Diff', 'Power']
        self.target_names = ['정상', '고장/이상']
        self.model = RandomForestClassifier(
            n_estimators=100, 
            random_state=42, 
            class_weight='balanced'
        )
        self.is_trained = False

    def preprocess(self, df):
        """데이터 전처리: 컬럼명 변경 및 파생 변수 생성"""
        # 컬럼명 변경
        rename_map = {
            'Air temperature [K]': 'air_temp',
            'Process temperature [K]': 'process_temp',
            'Rotational speed [rpm]': 'rpm',
            'Torque [Nm]': 'torque',
            'Tool wear [min]': 'tool_wear'
        }
        df = df.rename(columns=rename_map)
        
        # 파생 변수 생성
        df['Temp_Diff'] = df['process_temp'] - df['air_temp']
        df['Power'] = df['rpm'] * df['torque']
        
        # Machine failure 컬럼이 없으면 생성
        if 'Machine failure' not in df.columns:
            failure_cols = ['TWF', 'HDF', 'PWF', 'OSF', 'RNF']
            available_cols = [col for col in failure_cols if col in df.columns]
            if available_cols:
                df['Machine failure'] = df[available_cols].max(axis=1)
        
        return df

    def train(self, file_path):
        """모델 학습"""
        print("📊 [1차 모델] 데이터 로딩 중...")
        df = pd.read_csv(file_path)
        df = self.preprocess(df)
        
        X = df[self.features]
        y = df['Machine failure']
        
        print(f"✓ 전체 데이터: {len(df)}개")
        print(f"✓ 정상: {sum(y==0)}개, 고장: {sum(y==1)}개")
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print("\n SMOTE 적용 중...")
        smote = SMOTE(random_state=42)
        X_train_res, y_train_res = smote.fit_resample(X_train, y_train)
        print(f"✓ 증강 후 학습 데이터: {len(X_train_res)}개")
        
        print("\n [1차 모델] 학습 중...")
        self.model.fit(X_train_res, y_train_res)
        
        train_score = self.model.score(X_train_res, y_train_res)
        test_score = self.model.score(X_test, y_test)
        
        print(f"\n✅ [1차 모델] 학습 완료!")
        print(f"   - 학습 정확도: {train_score*100:.2f}%")
        print(f"   - 테스트 정확도: {test_score*100:.2f}%")
        
        self.is_trained = True

    def predict(self, input_data):
        """고장 확률 예측 (expectedError 값 반환)"""
        if not self.is_trained:
            raise ValueError("모델이 학습되지 않았습니다.")
        
        input_df = pd.DataFrame([input_data])
        input_df['Temp_Diff'] = input_df['process_temp'] - input_df['air_temp']
        input_df['Power'] = input_df['rpm'] * input_df['torque']
        
        probs = self.model.predict_proba(input_df[self.features])[0]
        failure_prob = probs[1]
        
        # 물리적 이상 감지
        is_abnormal_low = (
            input_data['rpm'] < 150 or 
            input_data['torque'] < 10
        )
        
        custom_threshold = 0.2
        is_failure = failure_prob >= custom_threshold or is_abnormal_low
        
        if is_failure:
            final_risk = max(failure_prob * 100, 90.0 if is_abnormal_low else 0)
        else:
            final_risk = failure_prob * 100
        
        # 상태 판정
        if failure_prob >= 0.75:
            status = '긴급'
        elif failure_prob >= 0.5:
            status = '주의'
        else:
            status = '정상'
        
        return {
            'expected_error': round(failure_prob, 2),  # 프론트엔드 형식
            'failure_probability_percent': round(failure_prob * 100, 2),
            'risk_score': round(final_risk, 2),
            'is_failure': is_failure,
            'status': status
        }

    def save_model(self, path='models/failure_model.pkl'):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        joblib.dump(self, path)
        print(f" [1차 모델] 저장: {path}")

    @staticmethod
    def load_model(path='models/failure_model.pkl'):
        model = joblib.load(path)
        print(f" [1차 모델] 로드: {path}")
        return model
    
class FailureCauseAnalyzer:
    """2차 모델: 고장 원인 Top-2 예측 (LightGBM)"""
    
    def __init__(self):
        self.features = ['air_temp', 'process_temp', 'rpm', 'torque', 'tool_wear',
                         'Temp_Diff', 'Power']
        
        self.failure_map = {
            0: 'TWF',
            1: 'HDF',
            2: 'PWF',
            3: 'OSF',
            4: 'RNF'
        }
        
        self.failure_names = {
            'TWF': 'Tool Wear Failure',
            'HDF': 'Heat Dissipation Failure',
            'PWF': 'Power Failure',
            'OSF': 'Overstrain Failure',
            'RNF': 'Random Failures'
        }
        
        self.model = LGBMClassifier(
            objective='multiclass',
            num_class=5,
            class_weight='balanced',
            random_state=42,
            verbose=-1
        )
        
        self.is_trained = False

    def preprocess(self, df):
        """데이터 전처리"""
        # 컬럼명 변경
        rename_map = {
            'Air temperature [K]': 'air_temp',
            'Process temperature [K]': 'process_temp',
            'Rotational speed [rpm]': 'rpm',
            'Torque [Nm]': 'torque',
            'Tool wear [min]': 'tool_wear'
        }
        df = df.rename(columns=rename_map)
        
        # 파생 변수 생성
        df['Temp_Diff'] = df['process_temp'] - df['air_temp']
        df['Power'] = df['rpm'] * df['torque']
        
        return df

    def train(self, file_path):
        """고장 유형 분류 모델 학습"""
        print("\n [2차 모델] 데이터 로딩 중...")
        df = pd.read_csv(file_path)
        df = self.preprocess(df)
        
        # 고장 데이터만 사용
        df_failure = df[df['Machine failure'] == 1].copy()
        print(f"✓ 고장 데이터 수: {len(df_failure)}개")
        
        # 고장 유형 라벨 생성 (단일 고장만)
        def get_failure_type(row):
            if row['TWF'] == 1: return 0
            if row['HDF'] == 1: return 1
            if row['PWF'] == 1: return 2
            if row['OSF'] == 1: return 3
            if row['RNF'] == 1: return 4
            return -1
        
        # 단일 고장만 필터링
        df_failure = df_failure[
            df_failure[['TWF','HDF','PWF','OSF','RNF']].sum(axis=1) == 1
        ].copy()
        
        df_failure['failure_type'] = df_failure.apply(get_failure_type, axis=1)
        df_failure = df_failure[df_failure['failure_type'] >= 0]
        
        print(f"✓ 단일 고장 데이터: {len(df_failure)}개")
        
        # 고장 유형별 분포 출력
        for label, name in self.failure_map.items():
            count = sum(df_failure['failure_type'] == label)
            print(f"   - {name}: {count}개")
        
        X = df_failure[self.features]
        y = df_failure['failure_type']
        
        # Train/Test 분리
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # SMOTE 적용
        print("\n SMOTE 적용 중...")
        smote = SMOTE(random_state=42)
        X_train_res, y_train_res = smote.fit_resample(X_train, y_train)
        print(f"✓ 증강 후 학습 데이터: {len(X_train_res)}개")
        
        # 모델 학습
        print("\n [2차 모델] 학습 중...")
        self.model.fit(X_train_res, y_train_res)
        
        train_score = self.model.score(X_train_res, y_train_res)
        test_score = self.model.score(X_test, y_test)
        
        print(f"\n✅ [2차 모델] 학습 완료!")
        print(f"   - 학습 정확도: {train_score*100:.2f}%")
        print(f"   - 테스트 정확도: {test_score*100:.2f}%")
        
        self.is_trained = True

    def predict_top2(self, input_data):
        """고장 원인 Top-2 예측 (프론트엔드 형식)"""
        if not self.is_trained:
            raise ValueError("모델이 학습되지 않았습니다.")
        
        input_df = pd.DataFrame([input_data])
        input_df['Temp_Diff'] = input_df['process_temp'] - input_df['air_temp']
        input_df['Power'] = input_df['rpm'] * input_df['torque']
        
        # 확률 예측
        probs = self.model.predict_proba(input_df[self.features])[0]
        
        # Top-2 추출
        top2_indices = np.argsort(probs)[::-1][:2]
        
        failure_predictions = []
        for idx in top2_indices:
            failure_predictions.append({
                'type': self.failure_map[idx],
                'probability': round(probs[idx] * 100, 1)
            })
        
        return failure_predictions

    def save_model(self, path='models/cause_analyzer.pkl'):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        joblib.dump(self, path)
        print(f" [2차 모델] 저장: {path}")

    @staticmethod
    def load_model(path='models/cause_analyzer.pkl'):
        model = joblib.load(path)
        print(f" [2차 모델] 로드: {path}")
        return model
    
class IntegratedAnalysisSystem:
    """통합 분석 시스템: 1차 + 2차 모델 결합"""
    
    def __init__(self):
        self.failure_detector = None  # 1차 모델
        self.cause_analyzer = None    # 2차 모델
    
    def load_models(self):
        """두 모델 모두 로드"""
        self.failure_detector = FailureDetectionSystem.load_model('models/failure_model.pkl')
        self.cause_analyzer = FailureCauseAnalyzer.load_model('models/cause_analyzer.pkl')
        print("\n 통합 분석 시스템 준비 완료")
    
    def analyze_equipment(self, input_data):
        """
        전체 분석 실행
        프론트엔드 형식에 맞춰 반환
        """
        if not self.failure_detector or not self.cause_analyzer:
            raise ValueError("모델이 로드되지 않았습니다.")
        
        # 1차 분석: 고장 확률
        failure_result = self.failure_detector.predict(input_data)
        
        # 2차 분석: 고장 원인 Top-2 (고장 가능성이 있을 때만)
        failure_predictions = None
        if failure_result['is_failure'] or failure_result['expected_error'] >= 0.1:
            failure_predictions = self.cause_analyzer.predict_top2(input_data)
        
        return {
            'expected_error': failure_result['expected_error'],
            'status': failure_result['status'],
            'failure_predictions': failure_predictions
        }