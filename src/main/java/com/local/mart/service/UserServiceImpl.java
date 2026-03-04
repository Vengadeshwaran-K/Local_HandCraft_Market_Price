package com.local.mart.service;

import com.local.mart.Repository.UserRepository;
import com.local.mart.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepo;

    @Override
    public String createUser(UserEntity user) {
        userRepo.save(user);
        return "Created Successfully";
    }

    @Override
    public String updateUser(UserEntity user) {
        int id=user.getId();
        UserEntity user1=userRepo.findById(id).orElse(new UserEntity());
        user1.setId(user.getId());
        user1.setAddress(user.getAddress());
        user1.setName(user.getName());
        user1.setEmail(user.getEmail());
        user1.setPhone(user.getPhone());
        user1.setPassword(user.getPassword());
        userRepo.save(user1);
        return "Updated Successfully";
    }

    @Override
    public List<UserEntity> getUser() {
        List<UserEntity> list=userRepo.findAll();
        return list;
    }

    @Override
    public UserEntity getUserById(Integer id) {
        return userRepo.findById(id).orElse(new UserEntity());
    }

    @Override
    public String DeleteUSer(Integer id) {
        userRepo.deleteById(id);
        return "Deleted";
    }
}
