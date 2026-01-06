package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.domain.PredictionResult;

public interface PredictionResultRepository extends MongoRepository<PredictionResult, String> {

    // ✅ 설비 ID로 데이터 조회 (Update 방식이므로 이 메서드 하나로 상세조회까지 해결)
    PredictionResult findByAssetId(String assetId);
    
    // ✅ 설비 ID를 기준으로 데이터 삭제
    void deleteByAssetId(String assetId);
}