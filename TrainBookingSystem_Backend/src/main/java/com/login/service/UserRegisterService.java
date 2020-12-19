package com.login.service;

import java.util.List;

import com.login.model.User;

public interface UserRegisterService {

	List<User> getUser();
	
	User addUser(User user);
}