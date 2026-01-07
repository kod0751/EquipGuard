package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestConfig {
    
    // 이 메서드가 RestTemplate을 스프링이 관리하는 '빈(Bean)'으로 등록합니다.
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}