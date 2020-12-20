package com.login.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.login.model.Seats;

public interface SeatsRepository extends JpaRepository<Seats, String>{

	@Query(value= "select * from seats t where t.trains_tid = :tid", nativeQuery = true)
	 List<Seats> findSeatsByTid(@Param("tid") String tid);
}
