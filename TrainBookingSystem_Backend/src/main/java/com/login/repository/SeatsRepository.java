package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.login.model.Seats;

public interface SeatsRepository extends JpaRepository<Seats, String>{
	
}
