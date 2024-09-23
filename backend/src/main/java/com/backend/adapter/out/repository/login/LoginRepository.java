package com.backend.adapter.out.repository.login;

import com.backend.domain.login.LoginDomain;

public interface LoginRepository {
	LoginDomain Login(LoginDomain domain) throws Exception;
}
