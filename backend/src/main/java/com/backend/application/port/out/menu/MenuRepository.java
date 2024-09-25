package com.backend.application.port.out.menu;

import java.util.List;
import java.util.Map;

public interface MenuRepository {
	List<Map<String, Object>> MenuList() throws Exception;
}
