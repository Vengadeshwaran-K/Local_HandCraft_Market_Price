package com.local.mart.service;

import com.local.mart.Repository.UserRepository;
import com.local.mart.entity.UserEntity;
import com.local.mart.util.JwtUtil;
import com.local.mart.util.Response;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final MessageProducer messageProducer;

    public UserServiceImpl(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
            MessageProducer messageProducer) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.messageProducer = messageProducer;
    }

    @Override
    public Response createUser(UserEntity user) {

        if (user.getName() == null || user.getName().isBlank())
            return new Response("Name cannot be empty");

        if (user.getEmail() == null || user.getEmail().isBlank())
            return new Response("Email cannot be empty");

        if (user.getPhone() == null || user.getPhone().isBlank())
            return new Response("Phone cannot be empty");

        if (userRepo.existsByEmail(user.getEmail()))
            return new Response("Email already registered");

        if (userRepo.existsByPhone(user.getPhone()))
            return new Response("Phone already registered");

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(com.local.mart.Enum.Role.ROLE_USER);
        }
        userRepo.save(user);

        try {
            messageProducer.sendMessage("User Created: " + user.getName() + " (" + user.getEmail() + ")");
        } catch (Exception e) {
            System.err.println("Failed to send user creation message: " + e.getMessage());
        }

        return new Response("User Created Successfully");
    }

    @Override
    public Response login(String email, String password) {
        Optional<UserEntity> user = userRepo.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String roleName = user.get().getRole() != null ? user.get().getRole().name() : "ROLE_USER";
            String token = jwtUtil.generateToken(user.get().getEmail(), roleName);
            return new Response(token);
        }
        return new Response("Invalid credentials");
    }

    @Override
    public Response updateUser(UserEntity user) {

        if (!userRepo.existsById(user.getId()))
            return new Response("User not found");

        UserEntity existingUser = userRepo.findById(user.getId()).get();

        if (!existingUser.getEmail().equals(user.getEmail()) &&
                userRepo.existsByEmail(user.getEmail()))
            return new Response("Email already used");

        if (!existingUser.getPhone().equals(user.getPhone()) &&
                userRepo.existsByPhone(user.getPhone()))
            return new Response("Phone already used");

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhone(user.getPhone());
        existingUser.setPassword(user.getPassword());
        existingUser.setAddress(user.getAddress());

        userRepo.save(existingUser);

        return new Response("User Updated Successfully");
    }

    @Override
    public List<UserEntity> getUser() {
        return userRepo.findAll();
    }

    @Override
    public UserEntity getUserById(Integer id) {

        if (!userRepo.existsById(id))
            return null;

        return userRepo.findById(id).get();
    }

    @Override
    public Response deleteUser(int id) {

        Response response = new Response();

        Optional<UserEntity> user = userRepo.findById(id);

        if (user.isEmpty()) {
            response.message = "User not found";
            return response;
        }

        userRepo.deleteById(id);

        response.message = "User deleted successfully";
        return response;
    }
}