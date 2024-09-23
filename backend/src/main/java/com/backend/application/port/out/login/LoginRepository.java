package com.backend.application.port.out.login;

import com.backend.domain.login.LoginDomain;

public interface LoginRepository {
	LoginDomain Login(LoginDomain domain) throws Exception;
}
