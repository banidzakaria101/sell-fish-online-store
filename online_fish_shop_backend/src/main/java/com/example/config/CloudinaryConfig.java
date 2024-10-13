package com.example.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = ObjectUtils.asMap(
                "cloud_name", "djakrliqf",
                "api_key", "675421236382494",
                "api_secret", "BRrMXglPA4JjMZzX8YXIxqMy3T0"
        );
        return new Cloudinary(config);
    }
}