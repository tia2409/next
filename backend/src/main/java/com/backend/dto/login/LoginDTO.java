package com.backend.dto.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
	private String user_id;
	private String user_pwd;
	private String user_nm;
	private String user_last_nm;
	private String ip_addr;
	private int loginResult;
}
