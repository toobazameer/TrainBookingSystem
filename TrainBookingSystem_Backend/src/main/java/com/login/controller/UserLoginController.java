package com.login.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins="*",allowedHeaders = "*")
@RequestMapping("dummy")
public class UserLoginController {
	
	@GetMapping("/")
	public String home(){
		return ("<h1>Welcome</h1");
	}
	
	@GetMapping("/edit")
	public String user() {
		return ("<h1>Welcome Edit</h1>");
	}
	
	@GetMapping("/delete")
	public String admin() {
		return ("<h1>Welcome Delete</h1>");
	}
	
}
