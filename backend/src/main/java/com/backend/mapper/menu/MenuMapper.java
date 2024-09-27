package com.backend.mapper.menu;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.backend.dto.menu.MenuDTO;

@Mapper
public interface MenuMapper {
	List<Map<String, Object>> MenuList();
	
	List<Map<String, Object>> MenuPath(MenuDTO dto);
}
