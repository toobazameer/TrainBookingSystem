package com.login.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.model.Seats;
import com.login.service.SeatsService;

@RestController
@CrossOrigin(origins="*", allowedHeaders = "*")
@RequestMapping("seats")
public class SeatsController {
	
	@Autowired
	private SeatsService ticketBookingService;
	
	@GetMapping(value ="/test")
	public String home() {
		return "Welcome to Ticket Booking";
	}
	
	//Find all Seats
	@GetMapping
	private List<Seats> getSeats(){
		return ticketBookingService.getSeats();
	}
	
	//Find seats of a particular train
	@GetMapping(value="/{tid}")
	private List<Seats> findSeats(@PathVariable String tid) {
		return ticketBookingService.findSeats(tid);
	} 
	
	//Add seats into a train
	@PostMapping(value="/{tid}")
	private Seats addSeat(@PathVariable String tid, @RequestBody Seats seats) {
		return ticketBookingService.addSeat(tid, seats);
	} 
	
	//Update seats of a train
	@PutMapping(value = "/{tid}")
	private Seats updateSeats(@PathVariable String tid, @RequestBody Seats seats) {
		return ticketBookingService.addSeat(tid, seats);
	}
		
	/*Delete train by tid
		@DeleteMapping(value = "/{sid}") 
		public void deleteStudent(@PathVariable String sid) {
		ticketBookingService.deleteSeats(sid);
	} */

}
