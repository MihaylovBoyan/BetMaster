package com.example.betmaster.user.service;

import com.example.betmaster.security.UserData;
import com.example.betmaster.user.model.User;
import com.example.betmaster.user.model.UserRole;
import com.example.betmaster.user.repository.UserRepository;
import com.example.betmaster.web.dto.RegisterDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void registerUser(RegisterDto registerDto) {

        Optional<User> optionalUser = userRepository.findByUsername(registerDto.getUsername());

        //TODO: Make appropriate exception handling!
        if (optionalUser.isPresent()) {
            throw new RuntimeException("Username [%s] already taken!".formatted(registerDto.getUsername()));
        }

        User user = new User()
                .setUsername(registerDto.getUsername())
                .setEmail(registerDto.getEmail())
                .setPassword(passwordEncoder.encode(registerDto.getPassword()))
                .setRegisteredOn(LocalDateTime.now())
                .setUpdatedOn(LocalDateTime.now())
                .setRole(UserRole.USER);
                //.setWallet();

        userRepository.save(user);

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //TODO: FIX THIS EXCEPTION!
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Username not found!"));
        return new UserData(user.getId(), user.getUsername(), user.getPassword(), user.getRole());
    }

    public User findById(UUID userId) {

        //TODO FIX THIS exception
       return userRepository.findById(userId).orElseThrow(RuntimeException::new);

    }
}
