package com.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface LoginMapper {
    String callLoginProcedure(@Param("user_id") String user_id, 
                              @Param("pwd") String pwd, 
                              @Param("ipAddr") String ipAddr);
}
