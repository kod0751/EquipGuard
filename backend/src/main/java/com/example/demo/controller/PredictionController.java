package com.example.demo.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.domain.PredictionResult;
import com.example.demo.service.PredictionResultService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/prediction")
public class PredictionController {

    private final PredictionResultService predictionService;

    public PredictionController(PredictionResultService predictionService) {
        this.predictionService = predictionService;
    }

    /**
     * ✅ [추가됨] 설비 저장 및 업데이트 (Update 방식)
     * 상세 페이지에서 분석을 실행하거나 설비를 추가할 때 호출합니다.
     */
    @PostMapping("/add")
    public ResponseEntity<PredictionResult> saveOrUpdate(@RequestBody PredictionResult result) {
        // 서비스에서 "ID가 있으면 업데이트, 없으면 신규 저장" 로직 수행
        PredictionResult savedResult = predictionService.saveOrUpdate(result);
        return ResponseEntity.ok(savedResult);
    }

    /**
     * ✅ 1. 관리 페이지용: 모든 설비의 상태 목록 조회 (기존 유지)
     */
    @GetMapping("/all-status")
    public ResponseEntity<List<PredictionResult>> getAllStatus() {
        List<PredictionResult> results = predictionService.getAllAssetsLatestStatus();
        return ResponseEntity.ok(results);
    }

    /**
     * ✅ 2. 상세 페이지용: 특정 설비 조회 (기존 유지)
     */
    @GetMapping("/{assetId}")
    public ResponseEntity<PredictionResult> getLatest(@PathVariable String assetId) {
        PredictionResult result = predictionService.getLatestAnalysis(assetId);
        return ResponseEntity.ok(result);
    }

    /**
     * ✅ 3. 설비 ID 리스트 조회 (기존 유지)
     */
    @GetMapping("/asset-ids")
    public ResponseEntity<List<String>> getAssetIds() {
        return ResponseEntity.ok(predictionService.getUniqueAssetIds());
    }

    /**
     * ✅ 4. 설비 삭제 (기존 유지)
     */
    @DeleteMapping("/{assetId}")
    public ResponseEntity<Void> deleteAsset(@PathVariable String assetId) {
        predictionService.deleteByAssetId(assetId);
        return ResponseEntity.ok().build();
    }


}