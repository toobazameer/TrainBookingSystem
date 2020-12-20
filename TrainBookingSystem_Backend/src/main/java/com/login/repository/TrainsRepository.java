package com.login.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.login.model.Seats;
import com.login.model.Trains;

public interface TrainsRepository extends JpaRepository<Trains, String>{

	@Query(value= "select * from trains t where t.source = :source and t.destination= :destination", nativeQuery = true)
	List<Trains> findBySource(@Param("source")String source, @Param("destination") String destination);
	
	@Query(value= "select t.trains_tid from trains t where t.tid = :tid", nativeQuery = true)
	 List<Seats> findSeatsByTid(@Param("tid") String tid);

}