//package com.example.demo.service;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.stereotype.Service;
//
//import com.example.demo.domain.PredictionResult;
//import com.example.demo.repository.PredictionResultRepository;
//
//@Service
//public class DashboardService {
//
//    private final PredictionResultRepository repository;
//
//    public DashboardService(PredictionResultRepository repository) {
//        this.repository = repository;
//    }
//
//    // 전체 설비 현재 상태
//    public List<PredictionResult> getAllStatus() {
//        return repository.findAll();
//    }
//
//    // KPI
//    public Map<String, Long> getKpiData() {
//        // 1. 최근 분석된 모든 설비 데이터 가져오기 (가장 최근 100건 등)
//        List<PredictionResult> latestResults = repository.findAll();
//
//        long total = latestResults.size();
//        
//        // 2. status 필드를 기준으로 각각의 개수 집계
//        long emergency = latestResults.stream()
//                .filter(r -> "긴급".equals(r.getStatus()))
//                .count();
//        
//        long caution = latestResults.stream()
//                .filter(r -> "주의".equals(r.getStatus()))
//                .count();
//        
//        long normal = latestResults.stream()
//                .filter(r -> "정상".equals(r.getStatus()))
//                .count();
//
//        // 3. 결과 맵 생성
//        Map<String, Long> kpi = new HashMap<>();
//        kpi.put("total", total);
//        kpi.put("emergency", emergency); // 긴급 정비
//        kpi.put("caution", caution);     // 주의
//        kpi.put("normal", normal);       // 정상 가동
//
//        return kpi;
//    }
//    
//}
