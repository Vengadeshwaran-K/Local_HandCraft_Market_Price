package com.local.mart.controller;

import com.local.mart.entity.UserEntity;
import com.local.mart.service.UserService;
import com.local.mart.util.Response;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    /* CREATE USER */
    @PostMapping("/create")
    public Response createUser(@Valid @RequestBody UserEntity user){
        return userService.createUser(user);
    }

    /* GET ALL USERS */
    @GetMapping("/allUsers")
    public List<UserEntity> getAllUsers(){
        return userService.getUser();
    }

    /* UPDATE USER */
    @PutMapping("/updateUsers")
    public Response updateUser(@RequestBody UserEntity user){
        return userService.updateUser(user);
    }

    /* GET USER BY ID */
    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable int id){
        return userService.getUserById(id);
    }

    /* DELETE USER */
    @DeleteMapping("/{id}")
    public Response deleteUser(@PathVariable int id){
        return userService.deleteUser(id);
    }

}