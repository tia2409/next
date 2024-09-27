package com.backend.service.menu;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.menu.MenuDTO;
import com.backend.mapper.menu.MenuMapper;

@Service
public class MenuService {
	
	@Autowired
	private MenuMapper mapper;
	
	public List<Map<String, Object>> MenuList() throws Exception {
		List<Map<String, Object>> result = mapper.MenuList();
		// 비즈니스 로직
		for (Map<String, Object> menu : result) {
			// 만약 서브메뉴라면
			if (menu.get("menu_level").equals(2)) {
				int group_cd = (int) menu.get("group_cd");
				
				for (Map<String, Object> mainMenu : result) {
					if(mainMenu.get("menu_level").equals(1) && mainMenu.get("group_cd").equals(group_cd)) {
						// "sub_menu" key가 없다면
						if (!mainMenu.containsKey("sub_menu")) {
							mainMenu.put("sub_menu", new ArrayList<Map<String, Object>>());
						}
						
						List<Map<String,Object>> subMenuList = (List<Map<String, Object>>) mainMenu.get("sub_menu");
						subMenuList.add(menu);
					}
				}
			}
		}
		
		return result;
	}
	
	public List<Map<String, Object>> MenuPath(MenuDTO dto) throws Exception {
		return mapper.MenuPath(dto);
	}
}
