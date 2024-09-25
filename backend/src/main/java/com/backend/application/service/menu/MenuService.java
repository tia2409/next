package com.backend.application.service.menu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.application.port.in.menu.MenuUseCase;
import com.backend.application.port.out.menu.MenuRepository;

@Service
public class MenuService implements MenuUseCase {

	@Autowired
	private MenuRepository menurepository;
	
	@Override
	public List<Map<String, Object>> MenuList() throws Exception {
		System.out.println("MenuService - MenuList() called");
		
		List<Map<String, Object>> result = menurepository.MenuList();
		// 비즈니스 로직

		System.out.println("MenuRepository - MenuList() end");
		
		return result;
	}

}
