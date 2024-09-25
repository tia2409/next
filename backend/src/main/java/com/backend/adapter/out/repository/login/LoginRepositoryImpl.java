package com.backend.adapter.out.repository.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.backend.application.port.out.login.LoginRepository;
import com.backend.domain.login.LoginDomain;
import com.backend.mapper.login.LoginMapper;

@Repository
public class LoginRepositoryImpl implements LoginRepository {

	@Autowired
	private LoginMapper mapper;
	
	// 로그인
	public LoginDomain Login(LoginDomain domain) throws Exception {
		System.out.println("LoginRepositoryImpl - Login() called");
		return mapper.Login(domain);
	}

}
