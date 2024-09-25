package com.backend.adapter.in.controller.menu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.port.in.menu.MenuUseCase;

@RestController
public class MenuController {
	
	@Autowired
	private MenuUseCase usecase;
	
	@RequestMapping("/menu_list")
	public List<Map<String, Object>> MenuList() throws Exception {
		System.out.println("MenuController - MenuList() called");
		return usecase.MenuList();
	}
}
