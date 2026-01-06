import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.model import IntegratedAnalysisSystem

def test_prediction():
    """모델 예측 테스트"""
    
    print("="*60)
    print("🔍 모델 예측 테스트")
    print("="*60)
    
    # 모델 로드
    system = IntegratedAnalysisSystem()
    system.load_models()
    
    # 테스트 데이터 (프론트엔드에서 오는 형식)
    test_cases = [
        {
            'name': '정상 설비',
            'data': {
                'air_temp': 305.0,
                'process_temp': 310.0,
                'rpm': 1450,
                'torque': 28.0,
                'tool_wear': 130,
            }
        },
        {
            'name': '이상 설비 (낮은 RPM)',
            'data': {
                'air_temp': 300.0,
                'process_temp': 308.0,
                'rpm': 100,  # 비정상적으로 낮음
                'torque': 25.0,
                'tool_wear': 200,
            }
        },
        {
            'name': '고장 위험 설비',
            'data': {
                'air_temp': 310.0,
                'process_temp': 320.0,
                'rpm': 1500,
                'torque': 50.0,
                'tool_wear': 240,
            }
        }
    ]
    
    # 각 케이스별 예측
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n[테스트 {i}] {test_case['name']}")
        print("-"*60)
        
        result = system.analyze_equipment(test_case['data'])
        
        print(f"📊 입력 데이터:")
        for key, value in test_case['data'].items():
            print(f"   {key}: {value}")
        
        print(f"\n🎯 예측 결과:")
        print(f"   고장 확률: {result['expected_error']*100:.1f}%")
        print(f"   상태: {result['status']}")
        
        if result['failure_predictions']:
            print(f"   고장 원인 Top-2:")
            for pred in result['failure_predictions']:
                print(f"      - {pred['type']}: {pred['probability']:.1f}%")
        else:
            print(f"   고장 원인: 정상 범위")
    
    print("\n" + "="*60)
    print("✅ 테스트 완료!")
    print("="*60)

if __name__ == "__main__":
    test_prediction()