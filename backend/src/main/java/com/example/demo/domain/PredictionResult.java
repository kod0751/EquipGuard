package com.example.demo.domain;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
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

    @JsonProperty("expected_error") // ML 서버의 expected_error를 이 필드에 매핑
    private double expectedError; 

    private double air_temp;     
    private double process_temp; 
    private int rpm;           
    private double torque;     
    private int tool_wear;      

    @JsonProperty("failure_predictions") // ML 서버의 failure_predictions를 이 필드에 매핑
    private List<FailurePrediction> failurePredictions;
    
    private String recommendation; 
    private LocalDateTime predictedAt;

    @Data
    public static class FailurePrediction {
        private String type;        
        private double probability; 
    }
}