package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service // 이 어노테이션이 있어야 스프링이 관리해줍니다.
public class GptService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 설비 데이터를 바탕으로 AI 권장 사항 3가지를 생성합니다.
     */
    public String getAiRecommendations(String assetId, double errorRate) {
        // 1. HTTP 헤더 설정 (인증 키 포함)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // 2. GPT에게 보낼 프롬프트(질문) 구성
        // 디자인 시안처럼 '합니다/하세요'체로 3줄 요약을 요청합니다.
        String prompt = String.format(
            "설비 전문가로서 답변해줘. 설비ID: %s, 현재 고장 확률: %.1f%%. " +
            "현장 작업자가 즉시 조치해야 할 사항 3가지를 알려줘. " +
            "각 문장은 짧게 '합니다' 또는 '하세요'로 끝내고, 다른 설명 없이 3줄의 문장만 보내줘.",
            assetId, errorRate
        );

        // 3. 요청 바디 데이터 구성
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo"); // 또는 gpt-4
        requestBody.put("messages", List.of(
            Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            // 4. OpenAI API 호출
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);
            
            // 5. JSON 응답에서 텍스트 내용만 추출
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            
            return (String) message.get("content");

        } catch (Exception e) {
            // API 호출 실패 시 시안과 유사한 기본 문구를 반환 (에러 방지)
            return "진동 수치가 평균보다 높습니다. 베어링 점검을 권장합니다.\n" +
                   "온도 변화가 감지되었습니다. 냉각 시스템을 확인하세요.\n" +
                   "예상 정비를 통해 고장 확률을 낮출 수 있습니다.";
        }
    }
}