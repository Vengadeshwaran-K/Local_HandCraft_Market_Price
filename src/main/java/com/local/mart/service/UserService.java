package com.local.mart.service;

import com.local.mart.entity.UserEntity;

import java.util.List;

public interface UserService {

    public String createUser(UserEntity user);

    public String updateUser(UserEntity user);

    public List<UserEntity> getUser();

    public UserEntity getUserById(Integer id);

    public String DeleteUSer(Integer id);
}
