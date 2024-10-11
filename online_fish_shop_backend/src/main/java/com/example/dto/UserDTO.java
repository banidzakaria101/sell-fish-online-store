package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class UserDTO {
    private String username;
    private String password;
    private String email;
    private String address;
    private String phoneNumber;
}
