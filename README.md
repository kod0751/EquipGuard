# EquipGuard 🛠️

> AI 기반 설비 고장 예측 시스템

EquipGuard는 머신러닝을 활용하여 설비의 고장 확률과 고장 유형을 예측하는 웹 애플리케이션입니다. 실시간 센서 데이터를 기반으로 설비의 상태를 모니터링하고, 사전에 고장을 예측하여 예방 정비를 가능하게 합니다.

## 📋 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [ML 모델 설명](#-ml-모델-설명)
- [설치 및 실행](#-설치-및-실행)
- [API 명세](#-api-명세)
- [팀 구성](#-팀-구성)
- [향후 계획](#-향후-계획)

## ✨ 주요 기능

### 현재 구현 기능
- **설비 고장 확률 예측**: 2단계 머신러닝 모델을 통한 정확한 고장 확률 분석
- **고장 유형 분류**: 5가지 고장 유형(Heat Dissipation, Power, Overstrain, Tool Wear, Random) 예측
- **설비 관리**: 설비 추가 및 리스트 조회
- **실시간 대시보드**: 설비 상태 모니터링 및 시각화

### 개발 예정 기능
- 설비 상세 페이지
- 설비 정보 수정 및 삭제
- 고장 이력 분석 및 통계

## 🛠 기술 스택

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18, shadcn/ui
- **State Management**: TanStack Query 5.90.16
- **Data Visualization**: Recharts 3.6.0

### Backend
- **Framework**: Spring Boot 3.2.5
- **Language**: Java 17
- **Database**: MongoDB

### Machine Learning
- **Framework**: FastAPI 0.110.0
- **ML Libraries**: 
  - scikit-learn 1.4.0
  - LightGBM 4.3.0
  - imbalanced-learn (SMOTE) 0.12.0
- **Data Processing**: Pandas, NumPy

### DevOps
- **Version Control**: Git, GitHub

## 📁 프로젝트 구조

```
EquipGuard/
├── frontend/          # React + TypeScript 프론트엔드
│   ├── src/
│   │   ├── features/
│   │   ├── shared/
│   │   ├── routes/
│   │   └── lib/
│   └── package.json
├── backend/           # Spring Boot 백엔드
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
└── ml/                # Python ML 서버
    ├── models/
    ├── notebooks/
    ├── app.py
    └── requirements.txt
```

## 🤖 ML 모델 설명

### 1. 데이터셋
- **출처**: [Kaggle - Machine Failure Predictions](https://www.kaggle.com/datasets/shashanknecrothapa/machine-failure-predictions)
- **특징**: 온도, RPM, 토크, 공구 마모도 등 5가지 핵심 데이터를 기반으로 함
- **전처**: Temp_Diff(온도차), Power(출력) 등 도메인 지식을 반영한 파생 변수 생성

### 2. 2단계 예측 시스템 (Hierarchical Prediction)

1단계: 고장 탐지 모델 (Binary Classification)
1단계 모델은 설비의 안전을 위해 '**실제 고장을 놓치지 않는 것** **(High Recall)**'에 최적화되었습니다.

- 주요 지표: 고장(Failure) 클래스에 대해 **93%의 높은 재현율** **(Recall)** 을 달성하였습니다.

- 혼동 행렬(Confusion Matrix) 분석:

  - 임계값(Threshold) 조정: 미세한 징후 포착을 위해 임계값을 0.2로 설정하였습니다.

  - 실제 고장 68건 중 63건을 정확히 찾아내어 현장의 가동 중단 리스크를 최소화합니다.

핵심 변수(Feature Importance):

**Power**와 **Rotational speed**가 고장 예측에 가장 결정적인 기여를 하는 것으로 나타났습니다.

2단계: 고장 원인 분석 모델 (Multi-class Classification)
2단계 모델은 감지된 고장의 원인을 정확히 분류하여 신속한 정비를 지원합니다.

- 주요 지표: 전체 정확도(Accuracy) 98% 및 매크로 평균 F1-score 0.98로 매우 정밀한 진단이 가능합니다.

  - 유형별 성능:

    - HDF, PWF: 100%의 분류 정확도를 보입니다.

    - TWF, OSF: 각각 89%, 100%의 높은 재현율을 기록하며 원인 분석의 신뢰성을 확보했습니다.

- 핵심 변수(Feature Importance):

  - **tool_wear**가 원인 분류의 가장 중요한 변수로 작용하며, 그 뒤를 이어 rpm과 **Temp_Diff**가 주요 진단 근거로 활용됩니다.

### 3. 모델 성능 최적화
- **데이터 불균형 해결**: SMOTE (Synthetic Minority Over-sampling Technique)를 적용하여 현저히 적은 고장 데이터를 증강 학습
- **모델 직렬화**: 학습된 모델은 joblib을 통해 객체화하여 실시간 추론(Inference) 환경에서 즉시 로드 가능

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 18.x 이상
- Java 17
- Python 3.9 이상
- MongoDB
- Maven

### 1. 레포지토리 클론
```bash
git clone https://github.com/kod0751/EquipGuard.git
cd EquipGuard
```

### 2. Backend 실행
```bash
cd backend

# application.properties에 MongoDB URI 및 OpenAI API 키 설정
# src/main/resources/application.properties
# spring.data.mongodb.uri=mongodb://localhost:27017/equipguard
# openai.api.key=YOUR_OPENAI_API_KEY

# 실행
mvn spring-boot:run
```

### 3. ML Server 실행
```bash
cd ml

# 가상환경 생성 및 활성화
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# FastAPI 서버 실행
python -m uvicorn app:app --reload --port 8000
```

### 4. Frontend 실행
```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 5. 접속
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- ML API: http://localhost:8000

## 📡 API 명세

### Backend API (Spring Boot)
```
GET    /api/equipment          # 설비 목록 조회
POST   /api/equipment          # 설비 추가
GET    /api/equipment/{id}     # 설비 상세 조회
PUT    /api/equipment/{id}     # 설비 수정 (예정)
DELETE /api/equipment/{id}     # 설비 삭제
```

### ML API (FastAPI)
```
POST   /predict/failure        # 고장 확률, 고장 유형 예측
```

## 👥 팀 구성

| 역할 | 담당 |
|------|------|
| Frontend & ML | [@kod0751](https://github.com/kod0751) |
| Backend & ML | [@kdh1202](https://github.com/kdh1202) |
| Frontend | [@mszzz2](https://github.com/mszzz2) |

## 🔮 향후 계획

- [ ] 설비 수정 기능
- [ ] 고장 이력 통계 및 분석
- [ ] 알림 시스템 (임계값 초과 시)
- [ ] 모바일 반응형 최적화
- [ ] PDF 리포트 생성


## 📞 문의

프로젝트에 대한 문의사항은 Issue를 통해 남겨주세요.

---

Made with ❤️ by EquipGuard Team
