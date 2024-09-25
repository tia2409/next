package com.backend.application.port.in.menu;

import java.util.List;
import java.util.Map;

public interface MenuUseCase {
	// 메뉴 List
	List<Map<String, Object>> MenuList() throws Exception;
}
