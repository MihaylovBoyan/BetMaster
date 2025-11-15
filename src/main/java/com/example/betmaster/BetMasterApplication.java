package com.example.betmaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class BetMasterApplication {

    public static void main(String[] args) {
        SpringApplication.run(BetMasterApplication.class, args);
    }

}
