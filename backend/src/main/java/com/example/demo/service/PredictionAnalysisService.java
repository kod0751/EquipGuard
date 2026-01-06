//package com.example.demo.service;
//
//import java.util.List;
//import org.springframework.stereotype.Service;
//import com.example.demo.domain.PredictionResult;
//import com.example.demo.repository.PredictionResultRepository;
//
//@Service
//public class PredictionAnalysisService {
//
//    private final PredictionResultRepository repository;
//
//    public PredictionAnalysisService(PredictionResultRepository repository) {
//        this.repository = repository;
//    }
//
//    /**
//     * ✅ 모든 설비의 최신 상태 목록 조회
//     * (Update 방식이므로 findAll이 곧 최신 상태 리스트입니다.)
//     */
//    public List<PredictionResult> getAllAssetCurrentStatus() {
//        return repository.findAll();
//    }
//
//    /**
//     * ✅ 특정 설비의 분석 데이터 조회
//     * 데이터가 없을 경우 null을 반환하거나 예외 처리를 할 수 있습니다.
//     */
//    public PredictionResult getAnalysisResult(String assetId) {
//        PredictionResult result = repository.findByAssetId(assetId);
//        
//        // 만약 데이터가 없으면 새로 생성하거나 에러를 던지는 로직을 추가할 수 있습니다.
//        if (result == null) {
//            // 예: System.out.println(assetId + "에 해당하는 데이터가 없습니다.");
//        }
//        
//        return result;
//    }
//}