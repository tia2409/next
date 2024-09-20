package com.backend.domain.login;

import java.math.BigInteger;
import java.security.MessageDigest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDomain {
	private String user_id;
	private String user_pwd;
	private String user_nm;
	private String user_last_nm;
	private String ip_addr;
	private int loginResult;
	
	// 비밀번호 암호화
	public void pwd_capsule() throws Exception {
		MessageDigest md = MessageDigest.getInstance("SHA-512");
		String temp_pwd = user_id + user_pwd; // 인스턴스 변수에 접근
        md.update(temp_pwd.getBytes());
        String sha_pwd = String.format("%0128x", new BigInteger(1, md.digest()));
        this.user_pwd = sha_pwd; // 인스턴스 변수에 암호화된 비밀번호 설정
	}
}
