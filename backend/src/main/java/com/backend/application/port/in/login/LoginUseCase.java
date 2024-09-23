package com.backend.application.port.in.login;

import com.backend.domain.login.LoginDomain;

public interface LoginUseCase {
	// 로그인
	int Login(LoginDomain domain) throws Exception;
}
