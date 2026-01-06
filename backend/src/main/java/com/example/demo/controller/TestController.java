//package com.example.demo.controller;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Random;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.demo.domain.PredictionResult;
//import com.example.demo.service.PredictionResultService;
//
//@RestController
//@RequestMapping("/api/test") // 공통 경로
//public class TestController {
//
//    private final PredictionResultService predictionResultService;
//
//    // 생성자 주입
//    public TestController(PredictionResultService predictionResultService) {
//        this.predictionResultService = predictionResultService;
//    }
//
//    @PostMapping("/insert-random") // 최종 경로: /api/test/insert-random
//    public ResponseEntity<String> insertRandomData() {
//        List<PredictionResult> dataList = new ArrayList<>();
//        Random r = new Random();
//
//        for (int i = 0; i < 10; i++) {
//            PredictionResult data = new PredictionResult();
//            data.setAssetId("EQ-" + (1000 + i)); 
//            data.setAssetType(i % 2 == 0 ? "중형 설비" : "대형 설비");
//            data.setStatus("정상");
//            data.setPredictedAt(LocalDateTime.now());
//
//            // 🔹 0이 아닌 실제 랜덤 수치 삽입
//            data.setAir_temp(300 + (r.nextDouble() * 5));      
//            data.setProcess_temp(310 + (r.nextDouble() * 10)); 
//            data.setRpm(1400 + r.nextInt(200));                
//            data.setTorque(35 + (r.nextDouble() * 15));        
//            data.setTool_wear(r.nextInt(150));                 
//            data.setExpectedWear(r.nextDouble() * 0.2);        
//
//            dataList.add(data);
//        }
//
//        // 🔹 수정: Repository를 직접 부르는 게 아니라 서비스의 save 기능을 사용합니다.
//        // 만약 서비스에 saveAll이 없다면 밑의 설명을 참고하세요.
//        for (PredictionResult result : dataList) {
//            predictionResultService.saveOrUpdate(result); 
//        }
//
//        return ResponseEntity.ok("✅ 10개의 데이터가 성공적으로 삽입되었습니다.");
//    }
//}