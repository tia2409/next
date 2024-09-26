package com.backend.controller.menu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.service.menu.MenuService;

@RestController
public class MenuController {
	@Autowired
	private MenuService service;
	
	@RequestMapping("MenuList")
	public List<Map<String, Object>> MenuList() throws Exception {
		System.out.println("MenuController - MenuList() called");
		return service.MenuList();
	}
}
