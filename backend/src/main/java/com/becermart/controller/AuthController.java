package com.becermart.controller;

import com.becermart.model.User;
import com.becermart.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) throws Exception {
        return authService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> body) throws Exception {
        return authService.login(body.get("email"), body.get("password"));
    }

    @PostMapping("/logout/{id}")
    public String logout(@PathVariable UUID id) throws Exception {
        authService.logout(id);
        return "User berhasil logout";
    }
}
