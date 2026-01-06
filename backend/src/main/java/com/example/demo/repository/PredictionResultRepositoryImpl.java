//package com.example.demo.repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.data.domain.Sort;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.stereotype.Repository;
//
//import com.example.demo.domain.PredictionResult;
//
//@Repository
//public class PredictionResultRepositoryImpl
//        implements PredictionResultRepositoryCustom {
//
//    private final MongoTemplate mongoTemplate;
//
//    public PredictionResultRepositoryImpl(MongoTemplate mongoTemplate) {
//        this.mongoTemplate = mongoTemplate;
//    }
//
//    /**
//     * 🔹 예측 결과 upsert
//     */
//    @Override
//    public void upsertPredictionResult(
//            String assetId,
//            String assetType,
//            Map<String, Object> prediction,
//            Map<String, Object> probability,
//            String recommendation,
//            LocalDateTime predictedAt) {
//
//        Query query = new Query(Criteria.where("assetId").is(assetId));
//
//        org.springframework.data.mongodb.core.query.Update update =
//                new org.springframework.data.mongodb.core.query.Update()
//                		.set("assetType", assetType)
//                        .set("prediction", prediction)
//                        .set("probability", probability)
//                        .set("recommendation", recommendation)
//                        .set("predictedAt", predictedAt);
//
//        mongoTemplate.upsert(query, update, PredictionResult.class);
//    }
//
//    /**
//     * ✅ 예측 결과 리스트 조회 (최근 N건)
//     */
//    @Override
//    public List<PredictionResult> findLatest(int limit) {
//        Query query = new Query()
//                .with(Sort.by(Sort.Direction.DESC, "predictedAt"))
//                .limit(limit);
//
//        return mongoTemplate.find(query, PredictionResult.class);
//    }
//}
