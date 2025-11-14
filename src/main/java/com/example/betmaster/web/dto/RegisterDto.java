package com.example.betmaster.web.dto;

import jakarta.validation.constraints.Size;

public class RegisterDto {

    @Size(min = 4, max = 20, message = "Username must be between 4 and 20 symbols.")
    private String username;

    private String email;

    private String password;

    private String confirmPassword;


    public RegisterDto() {
    }

    public String getUsername() {
        return username;
    }

    public RegisterDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public RegisterDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public RegisterDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public RegisterDto setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
        return this;
    }
}
