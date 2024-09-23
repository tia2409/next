package com.backend.adapter.in.controller.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.port.in.login.LoginUseCase;
import com.backend.domain.login.LoginDomain;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class LoginController {
	
	@Autowired
	private LoginUseCase usecase;
	
	@RequestMapping("test")
	public String test() {
		System.out.println("test() called");
		return "테스트입니다.";
	}
	
	
	@PostMapping("DB_test")
	public int DB_test(LoginDomain domain, HttpServletRequest servletRequest) throws Exception {
		System.out.println("LoginController - DB_test() called");
		
		domain.setIp_addr(servletRequest.getRemoteAddr());
		
		return usecase.Login(domain);
	}
}
