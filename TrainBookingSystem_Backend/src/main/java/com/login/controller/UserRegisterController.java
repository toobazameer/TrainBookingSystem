package com.login.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.model.User;
import com.login.service.UserRegisterService;

@RestController
@CrossOrigin(origins="*", allowedHeaders = "*")
@RequestMapping("registration")
public class UserRegisterController {
	
	@Autowired
	private UserRegisterService userRegisterService;
	
	@GetMapping
	private List<User> getUser(){
		return userRegisterService.getUser();
	}
	
	@PostMapping
	private User addUser(@RequestBody User user) {
		return userRegisterService.addUser(user);
	}

}
