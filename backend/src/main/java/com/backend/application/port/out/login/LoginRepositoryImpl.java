package com.backend.application.port.out.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.backend.LoginMapper;
import com.backend.adapter.out.repository.login.LoginRepository;
import com.backend.domain.login.LoginDomain;

@Repository
public class LoginRepositoryImpl implements LoginRepository {

	@Autowired
	private LoginMapper mapper;
	
	// 로그인
	public LoginDomain Login(LoginDomain domain) throws Exception {
		return mapper.Login(domain);
	}

}
