package com.login.service;

import java.util.List;
import com.login.model.Seats;

public interface SeatsService {

	List<Seats> getSeats();
	
	Seats addSeat(String tid,Seats seats);

	List<Seats> findSeats(String tid);

	//void deleteSeats(String sid);

}
