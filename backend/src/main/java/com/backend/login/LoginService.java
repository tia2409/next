package com.backend.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.mapper.LoginMapper;

@Service
@Transactional
public class LoginService {

    private final LoginMapper LoginMapper;

    @Autowired
    public LoginService(LoginMapper LoginMapper) {
        this.LoginMapper = LoginMapper;
    }

    public String login(String userId, String password, String ipAddr) {
        return LoginMapper.callLoginProcedure(userId, password, ipAddr); // LoginMapper에서 저장 프로시저 호출, 문자열 반환
    }
}
