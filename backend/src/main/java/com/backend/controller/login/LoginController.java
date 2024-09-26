package com.backend.controller.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.login.LoginDTO;
import com.backend.service.login.LoginService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class LoginController {
	
	@Autowired
	private LoginService service;
	
	@PostMapping("Login")
	public int Login(LoginDTO dto, HttpServletRequest servletRequest) throws Exception {
		System.out.println("LoginController - Login() called");
		dto.setIp_addr(servletRequest.getRemoteAddr());
		
		return service.Login(dto);
	}
}
