package com.example.demo.domain;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonProperty; // 추가
import lombok.Data;

@Document(collection = "prediction_result")
@Data
public class PredictionResult {
    @Id
    private String id;
    private String assetId;
    private String type;
    private String status;

    // Jackson(JSON) 매핑과 MongoDB 매핑을 모두 지정
    @Field("expected_error") 
    @JsonProperty("expected_error")
    private double expectedError;

    private double air_temp;
    private double process_temp; 
    private int rpm;
    private double torque;
    private int tool_wear;

    @Field("failure_predictions")
    @JsonProperty("failure_predictions")
    private List<FailurePrediction> failurePredictions;

    private String recommendation; 
    private LocalDateTime predictedAt;

    @Data
    public static class FailurePrediction {
        private String type;
        private double probability; 
    }

    private List<String> aiRecommendations;
}