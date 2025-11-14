package com.example.betmaster.web;

import com.example.betmaster.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class IndexController {

    private final UserService userService;

    public IndexController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "BetMaster - Sports Betting Home");
        return "index";
    }

    @GetMapping("/register")
    public String register(Model model){
        model.addAttribute("title", "Register - BetMaster");
        return "register";
    }

}
