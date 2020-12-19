package com.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.login.model.User;

public interface UserRepository extends JpaRepository<User, String>{
	Optional<User> findByUserName(String userName);

}
