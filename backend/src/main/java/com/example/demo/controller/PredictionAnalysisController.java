//package com.example.demo.controller;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.demo.domain.PredictionResult;
//import com.example.demo.service.PredictionAnalysisService;
//
//@RestController
//@RequestMapping("/api/prediction-analysis")
//public class PredictionAnalysisController {
//
//    private final PredictionAnalysisService analysisService;
//
//    public PredictionAnalysisController(PredictionAnalysisService analysisService) {
//        this.analysisService = analysisService;
//    }
//
//    /**
//     * ✅ AI 예측 분석 API 루트
//     * - 주소창 테스트용
//     * - "분석 결과 API"라는 의미를 명확히 하기 위함
//     */
//    @GetMapping
//    public Map<String, Object> analysisRoot() {
//        Map<String, Object> result = new HashMap<>();
//        result.put("message", "Prediction analysis API is running");
//        result.put("endpoints", List.of(
//                "/api/prediction-analysis/results",
//                "/api/prediction-analysis/{assetId}"
//        ));
//        return result;
//    }
//
//    /**
//     * 🔹 AI 예측 분석 결과 목록
//     * - 최근 분석 결과 N건
//     * - 예측 결과 페이지 리스트용
//     */
//    @GetMapping("/results")
//    public List<PredictionResult> getAnalysisResults() {
//        return analysisService.getAllAssetCurrentStatus();
//    }
//
//    /**
//     * 🔹 특정 설비 AI 예측 분석 결과
//     * - 설비 선택 후 결과 화면용
//     * - 예: /api/prediction-analysis/EQ-001
//     */
//    @GetMapping("/{assetId}")
//    public PredictionResult getAnalysisResult(@PathVariable String assetId) {
//        return analysisService.getAnalysisResult(assetId);
//    }
//}
