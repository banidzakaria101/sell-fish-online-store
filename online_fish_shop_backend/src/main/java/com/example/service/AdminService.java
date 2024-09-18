package com.example.service;

import com.example.Enum.Role;
import com.example.model.Admin;
import com.example.repository.AdminRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostConstruct
    public void createAdmin() {
        String adminEmail = "moul_chi@example.com";
        Optional<Admin> existingAdmin = adminRepository.findByEmail(adminEmail);
        if (existingAdmin.isEmpty()) {
            Admin admin = new Admin();
            admin.setEmail(adminEmail);
            admin.setAddress("example address");
            admin.setPhoneNumber("0636323156");
            admin.setUsername("admin");
            admin.setRole(Role.ADMIN);
            admin.setPassword(passwordEncoder.encode("admin"));
            adminRepository.save(admin);

        }
    }
}
