package com.becermart.service;

import com.becermart.exception.BusinessException;
import com.becermart.model.User;
import com.becermart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new BusinessException("USER_ALREADY_EXIST", "User dengan email ini sudah terdaftar!");
        }

        user.setId(UUID.randomUUID());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setLoggedIn(false);
        user.setLastLogin(null);

        return userRepository.save(user);
    }

    public User login(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("USER_NOT_FOUND", "User tidak ditemukan"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BusinessException("PASSWORD_INCORRECT","Password salah");
        }

        user.setLoggedIn(true);
        user.setLastLogin(Timestamp.valueOf(LocalDateTime.now()));

        return userRepository.save(user);
    }

    public void logout(UUID userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException("USER_NOT_FOUND", "User tidak ditemukan"));

        user.setLoggedIn(false);
        userRepository.save(user);
    }
}
