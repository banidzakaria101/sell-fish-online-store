package com.example.controller;

import com.example.dto.AdminDTO;
import com.example.dto.CustomerDTO;
import com.example.dto.LoginResponse;
import com.example.dto.LoginUserDTO;
import com.example.exception.UserNotFoundException;
import com.example.model.User;
import com.example.security.AuthenticationService;
import com.example.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> singUp(@RequestBody CustomerDTO customerDTO) {
        System.out.println(customerDTO.toString());
        User user = authenticationService.signUp(customerDTO);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add-admin")
    public ResponseEntity<User> addAdmin(@RequestBody AdminDTO adminDTO) {
        User newAdmin = authenticationService.addAdmin(adminDTO);
        return ResponseEntity.ok(newAdmin);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDTO loginUserDTO) {
        System.out.println("Login attempt for user: " + loginUserDTO);
        System.out.println("Username/Email: " + loginUserDTO.getUsernameOrEmail());
        System.out.println("Password: " + loginUserDTO.getPassword());
        try {
            User authenticatedUser = authenticationService.authenticate(loginUserDTO);
            String jwtToken = jwtService.generateToken(authenticatedUser, authenticatedUser.getRole());

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(jwtToken);
            loginResponse.setExpiresIn(jwtService.getExpirationTime());

            return ResponseEntity.ok(loginResponse);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while attempting to login");
        }
    }



}
