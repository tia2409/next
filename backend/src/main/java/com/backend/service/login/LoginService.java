package com.backend.service.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.login.LoginDTO;
import com.backend.mapper.login.LoginMapper;

@Service
public class LoginService {
	
	@Autowired
	private LoginMapper mapper;
	
	// 로그인
	public int Login(LoginDTO dto) throws Exception {
		System.out.println("LoginService - Login() called");
		// 로직 구현
		dto.pwd_capsule();
		
		LoginDTO result = mapper.Login(dto);
		
		System.out.println("LoginService - Login() complete : " + result + ", return 값: " + result.getLoginResult());
		return result.getLoginResult();
	}
}
