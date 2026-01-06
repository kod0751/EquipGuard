//package com.example.demo.controller;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.demo.domain.PredictionResult;
//import com.example.demo.service.DashboardService;
//
//@RestController
//@RequestMapping("/api/dashboard")
//public class DashboardController {
//
//    private final DashboardService dashboardService;
//
//    public DashboardController(DashboardService dashboardService) {
//        this.dashboardService = dashboardService;
//    }
//
//    /**
//     * ✅ 대시보드 API 루트
//     * - 주소창 테스트용
//     * - API 살아있는지 확인용
//     */
//    @GetMapping
//    public Map<String, Object> dashboardRoot() {
//        Map<String, Object> result = new HashMap<>();
//        result.put("message", "Dashboard API is running");
//        result.put("endpoints", List.of(
//            "/api/dashboard/kpi",
//            "/api/dashboard/assets"
//        ));
//        return result;
//    }
//
//    /**
//     * 🔹 KPI 카드 데이터
//     * - 전체 설비 수
//     * - HIGH / MEDIUM / LOW 개수
//     */
//    @GetMapping("/kpi")
//    public Map<String, Long> getKpi() {
//        return dashboardService.getKpiData();
//    }
//
//    /**
//     * 🔹 대시보드 전체 설비 현재 상태
//     * - prediction_result 전체 조회
//     */
//    @GetMapping("/assets")
//    public List<PredictionResult> getAllAssets() {
//        return dashboardService.getAllStatus();
//    }
//}
