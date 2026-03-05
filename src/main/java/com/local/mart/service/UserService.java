package com.local.mart.service;

import com.local.mart.entity.UserEntity;
import com.local.mart.util.Response;

import java.util.List;

public interface UserService {

    public Response createUser(UserEntity user);

    public Response updateUser(UserEntity user);

    public List<UserEntity> getUser();

    public UserEntity getUserById(Integer id);

    Response deleteUser(int id);

    Response login(String email, String password);
}
