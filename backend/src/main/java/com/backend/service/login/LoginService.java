package com.backend.service.login;

import java.math.BigInteger;
import java.security.MessageDigest;

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
		// 비즈니스 로직 구현
		String user_id = dto.getUser_id();
		String user_pwd = dto.getUser_pwd();
		String temp_pwd = user_id + user_pwd;
		
		MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(temp_pwd.getBytes());
        String sha_pwd = String.format("%0128x", new BigInteger(1, md.digest()));
        dto.setUser_pwd(sha_pwd);
		
		LoginDTO result = mapper.Login(dto);
		
		return result.getLoginResult();
	}
}
