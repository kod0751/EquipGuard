package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

// 에러 해결을 위한 핵심 Import
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.domain.PredictionResult;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.*;

@Service
public class GptService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 리턴 타입을 String -> List<String>으로 변경했습니다.
     */
    public List<String> getAiRecommendations(String assetId, double expectedError, List<PredictionResult.FailurePrediction> failurePredictions) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setBearerAuth(apiKey);

    double errorRatePercent = expectedError * 100;

    // 상세 고장 유형 정보를 문자열로 변환
    String failureDetails = "";
    if (failurePredictions != null && !failurePredictions.isEmpty()) {
        failureDetails = failurePredictions.stream()
            .map(fp -> String.format("- %s (확률: %.1f%%)", fp.getType(), fp.getProbability()))
            .collect(java.util.stream.Collectors.joining("\n"));
    }

    // 프롬프트에 상세 고장 유형(failureDetails) 추가
    String prompt = String.format(
        "설비ID: %s\n" +
        "전체 고장 확률: %.1f%%\n" +
        "주요 고장 유형:\n%s\n\n" +
        "위 데이터를 바탕으로 현장 작업자가 즉시 조치해야 할 사항 3가지를 알려줘. " +
        "답변은 반드시 다른 설명 없이 [\"문장1\", \"문장2\", \"문장3\"] 형식의 JSON 배열로만 보내줘.",
        assetId, errorRatePercent, failureDetails
    );

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(
            Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);
            
            // 응답에서 JSON 문자열(content) 추출
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            String content = (String) ((Map<String, Object>) choices.get(0).get("message")).get("content");

            // 문자열 ["A", "B", "C"]를 List<String>으로 변환 (에러 해결 포인트)
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(content, new TypeReference<List<String>>() {});

        } catch (Exception e) {
            System.err.println("GPT 변환 중 에러 발생: " + e.getMessage());
            // 에러 발생 시 기본 조치 사항 리스트 반환
            return List.of(
                "진동 수치를 점검합니다.",
                "냉각 시스템을 확인하세요.",
                "정기 점검을 권장합니다."
            );
        }
    }
}