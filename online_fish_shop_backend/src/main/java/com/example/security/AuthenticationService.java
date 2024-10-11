package com.example.security;

import com.example.dto.AdminDTO;
import com.example.dto.CustomerDTO;
import com.example.dto.LoginUserDTO;
import com.example.mapper.UserMapper;
import com.example.model.Customer;
import com.example.model.User;
import com.example.repository.CustomerRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public User signUp(CustomerDTO input) {
        if (userRepository.findByUsername(input.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }

        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        Customer customer = userMapper.toCustomerEntity(input);
        System.out.println(customer.toString());
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }

    public User authenticate(LoginUserDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsernameOrEmail(),
                        input.getPassword())
        );
        return userRepository.findByUsernameOrEmail(input.getUsernameOrEmail(), input.getUsernameOrEmail());
    }

    public User addAdmin(AdminDTO input) {
        if (userRepository.findByUsername(input.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }

        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        User user = userMapper.toAdminEntity(input);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
