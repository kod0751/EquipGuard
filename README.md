# EquipGuard 🛠️

> AI 기반 설비 고장 예측 시스템

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://equip-guard-pied.vercel.app)

EquipGuard는 머신러닝을 활용하여 설비의 고장 확률과 고장 유형을 예측하는 웹 애플리케이션입니다. 실시간 센서 데이터를 기반으로 설비의 상태를 모니터링하고, 사전에 고장을 예측하여 예방 정비를 가능하게 합니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [ML 모델 설명](#ml-모델-설명)
- [설치 및 실행](#설치-및-실행)
- [API 명세](#api-명세)
- [팀 구성](#팀-구성)

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
- **Form Management**: React Hook Form 7.70.0 + Zod 4.3.5
- **Routing**: React Router DOM 7.11.0

### Backend
- **Framework**: Spring Boot 3.2.5
- **Language**: Java 17
- **Database**: MongoDB
- **Dependencies**: 
  - Spring Web
  - Spring Data MongoDB
  - Lombok
  - Jackson Databind

### Machine Learning
- **Framework**: FastAPI 0.110.0
- **Server**: Uvicorn 0.27.0
- **ML Libraries**:
  - scikit-learn 1.4.0
  - LightGBM 4.3.0
  - imbalanced-learn 0.12.0
- **Data Processing**: Pandas 2.2.0, NumPy 1.26.0
- **Visualization**: Matplotlib 3.8.0, Seaborn 0.13.0

### DevOps
- **Deployment**: Vercel (Frontend)
- **Version Control**: Git, GitHub

## 📁 프로젝트 구조

```
EquipGuard/
├── frontend/          # React + TypeScript 프론트엔드
│   ├── src/
│   │   ├── components/
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

### 데이터셋
- **출처**: [Kaggle - Machine Failure Predictions](https://www.kaggle.com/datasets/shashanknecrothapa/machine-failure-predictions)
- **특징**: 설비 센서 데이터를 기반으로 한 고장 예측 데이터셋
- **활용**: 범용 설비 데이터로 학습되어 다양한 산업군의 설비에 적용 가능

### 2단계 예측 시스템

#### 1단계: 이진 분류 (고장 여부 예측)
- **알고리즘**: Random Forest
- **목적**: 설비의 고장 발생 확률 예측
- **출력**: 정상(0) 또는 고장 가능성(1)

#### 2단계: 다중 분류 (고장 유형 예측)
- **알고리즘**: LightGBM
- **조건**: 1단계에서 일정 확률 이상의 고장 가능성이 감지된 경우 실행
- **출력**: 5가지 고장 유형
  - Heat Dissipation Failure (열 방출 불량)
  - Power Failure (전력 문제)
  - Overstrain Failure (과부하)
  - Tool Wear Failure (공구 마모)
  - Random Failure (무작위 고장)

### 모델 성능 최적화
- **불균형 데이터 처리**: imbalanced-learn 라이브러리 활용
- **하이퍼파라미터 튜닝**: GridSearch 및 Cross-Validation
- **모델 저장**: joblib을 통한 모델 직렬화

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
- Production: https://equip-guard-pied.vercel.app

## 📡 API 명세

### Backend API (Spring Boot)
```
GET    /api/equipment          # 설비 목록 조회
POST   /api/equipment          # 설비 추가
GET    /api/equipment/{id}     # 설비 상세 조회
PUT    /api/equipment/{id}     # 설비 수정 (예정)
DELETE /api/equipment/{id}     # 설비 삭제 (예정)
```

### ML API (FastAPI)
```
POST   /predict/failure        # 고장 확률 예측
POST   /predict/failure-type   # 고장 유형 예측
GET    /health                 # 헬스 체크
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
