package com.example.betmaster.web;

import com.example.betmaster.security.UserData;
import com.example.betmaster.user.model.User;
import com.example.betmaster.user.service.UserService;
import com.example.betmaster.web.dto.DtoMapper;
import com.example.betmaster.web.dto.EditProfileDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


import java.util.UUID;

@Controller
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public String profile(@AuthenticationPrincipal UserData userData, Model model){

        UUID userId = userData.getUserId();
        User user = userService.findById(userId);
        EditProfileDto profileDto = DtoMapper.from(user);

        model.addAttribute("profileDto", profileDto);
        model.addAttribute("user", user);


        return "profile";
    }

//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/admin")
//    public String adminPanel(){
//        return "admin";
//    }
//
//        model.addAttribute("user", user);
//        model.addAttribute("wallet", user.getWallet());
//        model.addAttribute("success", "Profile updated successfully");
//        model.addAttribute("profileDto", profileDto);
//
//    }

}
