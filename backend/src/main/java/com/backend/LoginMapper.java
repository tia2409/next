package com.backend;

import org.apache.ibatis.annotations.Mapper;

import com.backend.domain.login.LoginDomain;

@Mapper
public interface LoginMapper {
	LoginDomain Login(LoginDomain vo);
}