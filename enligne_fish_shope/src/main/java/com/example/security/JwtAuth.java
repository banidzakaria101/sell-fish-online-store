package com.example.security;
import com.example.Enum.Role;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuth {

    public static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String generateToken(String username, List<Role> roles) {
        String rolesClaim = roles.stream()
                .map(Role :: name)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .claim("roles", rolesClaim)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}
