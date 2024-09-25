package com.backend.domain.menu;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuDomain {
	//Web
	
	//공통
	
	//DB
	private String menu_cd;
	private String menu_id;
	private String title_ko;
	private String title_en;
	private String title_jp;
	private String link_id; // url 주소
	private int menu_level; // 타이틀 순서
	private int sub_menu_level; // 서브타이틀 순서
	private String img_src; // img 주소
	private String use_yn; // 사용여부
}
