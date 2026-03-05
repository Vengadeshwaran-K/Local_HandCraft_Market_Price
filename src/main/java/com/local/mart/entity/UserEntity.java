package com.local.mart.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Name cannot be empty")
    private String name;
    @Email(message="Invalid Email Format")
    private String email;
    @NotBlank(message= "Password cannot be empty")
    private String password;
    @NotBlank(message = "Phone number cannot be empty")
    @Size(min=10,max=10,message="Phone msut be 10 digits")
    private String phone;
    private String Address;

}
