package com.local.mart.controller;

import com.local.mart.entity.UserEntity;
import com.local.mart.service.UserService;
import com.local.mart.util.Response;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public Response CreateUser(@Valid @RequestBody UserEntity user){
        return userService.createUser(user);
    }

    @GetMapping("/allUsers")
    public List<UserEntity> getUser(){
        return userService.getUser();
    }

    @PutMapping("/updateUsers")
    public Response updateUser(@RequestBody UserEntity user){
        return userService.updateUser(user);
    }

    @GetMapping("/{id}/users")
    public UserEntity getUserById(@PathVariable int id){
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}/users")
    public Response deleteUser(@PathVariable int id){
        return userService.deleteUser(id);
    }

}
