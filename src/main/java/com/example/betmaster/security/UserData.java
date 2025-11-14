package com.example.betmaster.security;

import com.example.betmaster.user.model.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class UserData implements UserDetails {

    private UUID userId;
    private String username;
    private String password;
    private UserRole role;

    public UserData() {
    }

    public UserData(UUID userId, String username, String password, UserRole role) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_" + this.role.name());
        return List.of(simpleGrantedAuthority);
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }


    public UUID getUserId() {
        return userId;
    }

    public UserData setUserId(UUID userId) {
        this.userId = userId;
        return this;
    }

    public UserData setUsername(String username) {
        this.username = username;
        return this;
    }

    public UserData setPassword(String password) {
        this.password = password;
        return this;
    }

    public UserRole getRole() {
        return role;
    }

    public UserData setRole(UserRole role) {
        this.role = role;
        return this;
    }
}
