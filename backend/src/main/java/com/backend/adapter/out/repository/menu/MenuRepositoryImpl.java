package com.backend.adapter.out.repository.menu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.backend.application.port.out.menu.MenuRepository;
import com.backend.mapper.menu.MenuMapper;

@Repository
public class MenuRepositoryImpl implements MenuRepository {

	@Autowired
	private MenuMapper mapper;
	
	@Override
	public List<Map<String, Object>> MenuList() throws Exception {
		System.out.println("MenuRepositoryImpl - MenuList() called");
		return mapper.MenuList();
	}
	
}
