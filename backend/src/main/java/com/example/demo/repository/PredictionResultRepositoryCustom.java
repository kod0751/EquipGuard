//package com.example.demo.repository;
//
//import java.time.LocalDateTime;
//import java.util.Map;
//import java.util.List;
//
//import com.example.demo.domain.PredictionResult;
//
//public interface PredictionResultRepositoryCustom {
//
//    // ✅ 이미 있음 (예측 결과 upsert)
//
//    void upsertPredictionResult(
//            String assetId,
//            String assetType, // 추가
//            Map<String, Object> prediction,
//            Map<String, Object> probability,
//            String recommendation,
//            LocalDateTime predictedAt
//    );
//    
//    
//    // ✅ 추가: 예측 결과 리스트 조회 (최근 N건)
//    List<PredictionResult> findLatest(int limit);
//}
//
