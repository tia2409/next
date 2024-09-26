package com.backend.mapper.login;

import org.apache.ibatis.annotations.Mapper;

import com.backend.dto.login.LoginDTO;

@Mapper
public interface LoginMapper {
	LoginDTO Login(LoginDTO vo);
}