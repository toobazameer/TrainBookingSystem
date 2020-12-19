package com.login.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Trains {

	// Trains(TID, TName, Source, Destination, Fare, Duration)
	@Id
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	private String tid;
	private String tname;
	private String source;
	private String destination;
	private double fare;
	private Long duration;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "trains")
	private Set<Seats> seats = new HashSet<Seats>();

	public Trains() {
		super();
	}

	public Trains(String tid, String tname, String source, String destination, double fare, Long duration,
			Set<Seats> seatsInfo) {
		super();
		this.tid = tid;
		this.tname = tname;
		this.source = source;
		this.destination = destination;
		this.fare = fare;
		this.duration = duration;
		this.seats = seatsInfo;
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getTname() {
		return tname;
	}

	public void setTname(String tname) {
		this.tname = tname;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public double getFare() {
		return fare;
	}

	public void setFare(double fare) {
		this.fare = fare;
	}

	public Long getDuration() {
		return duration;
	}

	public void setDuration(Long duration) {
		this.duration = duration;
	}

	public Set<Seats> getSeatsInfo() {
		return seats;
	}

	public void setSeatsInfo(Set<Seats> seats) {
		this.seats = seats;
	}

	@Override
	public String toString() {
		return "Trains [tid=" + tid + ", tname=" + tname + ", source=" + source + ", destination=" + destination
				+ ", fare=" + fare + ", duration=" + duration + ", seatsInfo=" + seats + "]";
	}

}
