package com.bitscheduler.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping ("/user/auth/{user_uid}")
    public User getUser (@PathVariable String user_uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("uid").is(user_uid));
        return mongoTemplate.findOne(query, User.class);
    }

    

    

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/user/auth/{username}/{password}")
    public User loginUser (@PathVariable String username, @PathVariable String password) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("username").is(username));
        return mongoTemplate.findOne(query, User.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PostMapping ("/user/auth")
    public User createUser (@RequestBody User user) {
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/all-user/auth")
    public List<User> getAllUser () {
        return userRepository.findAll();
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/user/auth/changeName/{uid}/{newName}")
    public User changeName (@PathVariable String uid, @PathVariable String newName) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setName(newName);
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/user/auth/changeUserName/{uid}/{userName}")
    public User changeUserName (@PathVariable String uid, @PathVariable String userName) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setUsername(userName);
        return userRepository.save(user);
    }

    @PutMapping ("/user/auth/changeNumber/{uid}/{number}")
    public User changeNumber (@PathVariable String uid, @PathVariable long number) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setPhone_number(number);
        return userRepository.save(user);
    }

    @PutMapping ("/user/auth/changeEmail/{uid}/{email}")
    public User changeEmail (@PathVariable String uid, @PathVariable String email) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setEmail(email);
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/user/auth/change-password/{uid}/{password}")
    public User resetPassword (@PathVariable String uid, @PathVariable String password) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setPassword(password);
        return userRepository.save(user);
    }
}
