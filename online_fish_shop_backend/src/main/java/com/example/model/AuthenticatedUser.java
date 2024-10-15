package com.example.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticatedUser extends User {
    private Long id;

    public AuthenticatedUser(User user, Long id) {
        super(user.getId(), user.getUsername(), user.getPassword(), user.getRole(), user.getEmail(), user.getPhoneNumber(), user.getAddress());
        this.id = id;
    }
}