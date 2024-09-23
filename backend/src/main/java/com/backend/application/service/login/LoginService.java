package com.backend.application.service.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.application.port.in.login.LoginUseCase;
import com.backend.application.port.out.login.LoginRepository;
import com.backend.domain.login.LoginDomain;

@Service
public class LoginService implements LoginUseCase {
	
	@Autowired
	private LoginRepository repository;
	
	// 로그인
	@Override
	public int Login(LoginDomain domain) throws Exception {
		System.out.println("LoginService - Login() called");
		// 로직 구현
		domain.pwd_capsule();
		
		LoginDomain result = repository.Login(domain);
		
		System.out.println("LoginService - Login() complete : " + result + ", return 값: " + result.getLoginResult());
		return result.getLoginResult();
	}
}
