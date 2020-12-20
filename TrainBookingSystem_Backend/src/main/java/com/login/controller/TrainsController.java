
package com.login.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.model.Trains;
import com.login.service.TrainsService;

@RestController
@CrossOrigin(origins="*", allowedHeaders = "*")
@RequestMapping("trains")
public class TrainsController {

	@Autowired
	private TrainsService trainCheckingService;

	@GetMapping("/test")
	private String home() {
		return "Welcome to train checking";
	}

	//Find All Trains
	@GetMapping
	private List<Trains> getTrains() {
		return trainCheckingService.getTrains();
	}
	
	//Find Trains by Tid
	@GetMapping(value = "/{tid}")
	private Optional<Trains> getTrainsById(@PathVariable String tid) {
		return trainCheckingService.getTrainsById(tid);
	}
	
	//Find Trains from particular source
	@GetMapping(value = "find/{source}/{destination}")
	private List<Trains> getTrains(@PathVariable String source, @PathVariable String destination) {
		return trainCheckingService.getTrains(source, destination);
	}

	//Add train
	@PostMapping
	private Trains addTrain(@RequestBody Trains trains) {
		return trainCheckingService.addTrain(trains);
	}

	//Update train by tid
	@PutMapping
	private Trains updateTrain(@RequestBody Trains trains) {
		return trainCheckingService.updateTrain(trains);
	}
	
	//Delete train by tid
	@DeleteMapping(value = "/{tid}") 
	public String delete(@PathVariable String tid) {
		return trainCheckingService.deleteTrain(tid);
	}

}
