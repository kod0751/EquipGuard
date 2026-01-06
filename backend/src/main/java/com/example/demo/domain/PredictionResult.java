package com.example.demo.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "prediction_result")
@Data
public class PredictionResult {
    @Id
    private String id;
    private String assetId;    
    
    // 프론트엔드 EquipmentType에 맞춰 필드명 변경: assetType -> type
    private String type;  
    
    private String status;       // 긴급, 주의, 정상
    
    // 프론트엔드 expectedError 명칭에 맞춰 필드명 변경: expectedWear -> expectedError
    private double expectedError; 

    // 실시간 입력 데이터 (프론트엔드와 동일하게 유지)
    private double air_temp;     
    private double process_temp; 
    private int rpm;           
    private double torque;     
    private int tool_wear;      

    private List<FailurePrediction> failurePredictions;
    private String recommendation; 
    private LocalDateTime predictedAt;

    @Data
    public static class FailurePrediction {
        private String type;        
        private double probability; 
    }
}