package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import com.example.demo.service.GptService;
import com.example.demo.domain.PredictionResult;
import com.example.demo.repository.PredictionResultRepository;

@Service
public class PredictionResultService {
    
    private final GptService gptService;
    private final PredictionResultRepository repository;
    private final RestTemplate restTemplate;

    // 생성자: final 필드들을 초기화합니다. (에러 해결 포인트)
    public PredictionResultService(PredictionResultRepository repository,GptService gptService) {
        this.repository = repository;
        this.gptService = gptService;
        this.restTemplate = new RestTemplate();
    }

    public PredictionResult saveOnly(PredictionResult data) {
    return processSave(data);
}

/**
 * ✅ 2. ML 분석 수행 후 저장 (analyze용)
 */
public PredictionResult saveWithAnalysis(PredictionResult newResult) {
    // 기존에 있던 ML 서버(FastAPI) 호출 로직을 그대로 유지합니다.
    String mlUrl = "http://localhost:8000/predict";
    try {
        PredictionResult mlResponse = restTemplate.postForObject(mlUrl, newResult, PredictionResult.class);
        if (mlResponse != null) {
            newResult.setExpectedError(mlResponse.getExpectedError());
            newResult.setStatus(mlResponse.getStatus());
            newResult.setFailurePredictions(mlResponse.getFailurePredictions());

            // 🚀 [추가 위치] ML 분석이 성공적으로 끝나면 GPT에게 권장사항을 물어봅니다.
                List<String> advice = gptService.getAiRecommendations(newResult.getAssetId(), newResult.getExpectedError());
            newResult.setAiRecommendations(advice);
        }
    } catch (Exception e) {
        System.err.println("❌ ML 서버 통신 중 오류 발생: " + e.getMessage());
    }

    return processSave(newResult);
}

/**
 * ✅ 3. 공통 DB 저장 처리 (ID 매핑 로직)
 */
private PredictionResult processSave(PredictionResult data) {
    PredictionResult existing = repository.findByAssetId(data.getAssetId());
    
    if (existing != null) {
        data.setId(existing.getId());
    } else {
        data.setId(null);
    }

    data.setPredictedAt(LocalDateTime.now());
    return repository.save(data);
}

    // --- 데이터 조회 메서드들 ---

    public List<PredictionResult> getAllAssetsLatestStatus() {
        return repository.findAll();
    }

    public List<String> getUniqueAssetIds() {
        return repository.findAll().stream()
                .map(PredictionResult::getAssetId)
                .distinct()
                .collect(Collectors.toList());
    }

    public PredictionResult getLatestAnalysis(String assetId) {
        return repository.findByAssetId(assetId);
    }

    public void deleteByAssetId(String assetId) {
        repository.deleteByAssetId(assetId);
    }
}