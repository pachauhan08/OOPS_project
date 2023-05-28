package com.bitscheduler.oopbackend;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document ("user")
public class User {

    @Id
    private String uid;
    private String name;
    private String email;
    private String password;
    private String username;
    private long phone_number;
    private LocalDateTime createdAt;
    private String color;
    private String role;
    private boolean admin;

    public User (String name, String email, String password, String username, long phone_number, String color, String role, boolean admin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.username = username;
        this.phone_number = phone_number;
        this.createdAt = LocalDateTime.now();
        this.color = color;
        this.role = role;
        this.admin = admin;
    }
}