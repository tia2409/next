package com.backend.controller.menu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.menu.MenuDTO;
import com.backend.service.menu.MenuService;

@RestController
public class MenuController {
	@Autowired
	private MenuService service;
	
	@RequestMapping("MenuList")
	public List<Map<String, Object>> MenuList() throws Exception {
		return service.MenuList();
	}
	
	@RequestMapping("MenuPath")
	public List<Map<String, Object>> MenuPath(MenuDTO dto) throws Exception {
		return service.MenuPath(dto);
	}
}
