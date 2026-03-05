package com.local.mart.controller;

import com.local.mart.entity.UserEntity;
import com.local.mart.service.UserService;
import com.local.mart.util.Response;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    /* REGISTER USER */
    @PostMapping("/register")
    public Response registerUser(@Valid @RequestBody UserEntity user) {
        return userService.createUser(user);
    }

    /* LOGIN USER */
    @PostMapping("/login")
    public Response login(@RequestBody UserEntity user) {
        return userService.login(user.getEmail(), user.getPassword());
    }

    /* GET ALL USERS */
    @GetMapping("/allUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserEntity> getAllUsers() {
        return userService.getUser();
    }

    /* UPDATE USER */
    @PutMapping("/updateUsers")
    public Response updateUser(@RequestBody UserEntity user) {
        return userService.updateUser(user);
    }

    /* GET USER BY ID */
    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    /* DELETE USER */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Response deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

}