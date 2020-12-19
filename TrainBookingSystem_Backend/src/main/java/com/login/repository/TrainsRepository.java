package com.login.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.login.model.Trains;

public interface TrainsRepository extends JpaRepository<Trains, String>{

	List<Trains> findBySource(String source);

}