from fastapi import FastAPI
from integrated_system import IntegratedAnalysisSystem

app = FastAPI()
system = IntegratedAnalysisSystem()
system.load_models() # 미리 학습한 pkl 파일 로드

@app.post("/predict")
def predict(data: dict):
    return system.analyze_equipment(data) # 분석 결과 반환