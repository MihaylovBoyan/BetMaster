package com.example.betmaster.web;

import com.example.betmaster.security.UserData;
import com.example.betmaster.user.model.User;
import com.example.betmaster.user.repository.UserRepository;
import com.example.betmaster.user.service.UserService;
import com.example.betmaster.web.dto.RegisterDto;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.UUID;


@Controller
public class IndexController {

    private final UserService userService;
    private final UserRepository userRepository;

    public IndexController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/home")
    public String home(Model model) {

        return "home";
    }

    @GetMapping("/login")
    public String login(Model model) {

        return "login";
    }

    @GetMapping("/register")
    public String registerForm(Model model){
        model.addAttribute("registerDto", new RegisterDto());
        return "register";
    }

    @PostMapping("/register")
    public String register(@Valid RegisterDto registerDto, BindingResult bindingResult, Model model){

        if(bindingResult.hasErrors()){
            return "register";
        }

        userService.registerUser(registerDto);


        return "redirect:/login";
    }



    @PostMapping("/profile/password")
    public String changePassword(@AuthenticationPrincipal UserData userData,
                                 @ModelAttribute PasswordChangeDto passwordDto,
                                 Model model) {
        if (userData == null) {
            return "redirect:/login";
        }

        UUID userId = userData.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // TODO: Validate current password
        // TODO: Check if new password matches confirm password
        // TODO: Update password with password encoder
        // For now, just show a message
        
        model.addAttribute("user", user);
        model.addAttribute("wallet", user.getWallet());
        model.addAttribute("success", "Password change functionality will be implemented soon");
        
        ProfileDto profileDto = new ProfileDto();
        profileDto.setFirstName(user.getFirstName());
        profileDto.setLastName(user.getLastName());
        profileDto.setEmail(user.getEmail());
        model.addAttribute("profileDto", profileDto);

        return "profile";
    }

    // Inner class for profile updates
    public static class ProfileDto {
        private String firstName;
        private String lastName;
        private String email;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    // Inner class for password change
    public static class PasswordChangeDto {
        private String currentPassword;
        private String newPassword;
        private String confirmPassword;

        public String getCurrentPassword() {
            return currentPassword;
        }

        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }
    }

}
