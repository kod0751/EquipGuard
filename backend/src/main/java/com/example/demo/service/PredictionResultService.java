package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.domain.PredictionResult;
import com.example.demo.repository.PredictionResultRepository;

import lombok.RequiredArgsConstructor;

@Service
public class PredictionResultService {

    private final PredictionResultRepository repository;

    public PredictionResultService(PredictionResultRepository repository) {
        this.repository = repository;
        
    }
  
    
    
    /**
     * ✅ [관리 페이지용] 모든 설비 목록 조회
     * Update 방식이므로 중복이 없습니다.
     */
    public List<PredictionResult> getAllAssetsLatestStatus() {
        return repository.findAll();
    }

    /**
     * ✅ [중요] 설비 ID 리스트 조회 (컨트롤러 에러 해결용)
     * 셀렉트 박스 등에서 설비 ID 목록만 필요할 때 사용합니다.
     */
    public List<String> getUniqueAssetIds() {
        return repository.findAll().stream()
                .map(PredictionResult::getAssetId)
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * ✅ [설비 저장 및 업데이트] 핵심 로직
     */
    public PredictionResult saveOrUpdate(PredictionResult newResult) {
        // 기존에 같은 assetId를 가진 데이터가 있는지 확인
        PredictionResult existing = repository.findByAssetId(newResult.getAssetId());

        if (existing != null) {
            // 기존 DB ID를 새 객체에 주입하여 Update 수행
            newResult.setId(existing.getId());
        }

        newResult.setPredictedAt(LocalDateTime.now());
        return repository.save(newResult);
    }

    /**
     * ✅ [상세 페이지용] 특정 설비 조회
     */
    public PredictionResult getLatestAnalysis(String assetId) {
        return repository.findByAssetId(assetId);
    }

    /**
     * ✅ [관리 페이지용] 설비 삭제
     */
    public void deleteByAssetId(String assetId) {
        repository.deleteByAssetId(assetId);
    }

   
}