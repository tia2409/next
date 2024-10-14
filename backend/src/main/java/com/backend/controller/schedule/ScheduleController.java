package com.backend.controller.schedule;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "http://localhost:3000")
public class ScheduleController {

    // @GetMapping("/{update}")
    // public ResponseEntity<?> getScheduleUpdate(@PathVariable String update) {
    //     // update 값을 처리하고 데이터 반환
    //     return ResponseEntity.ok("Schedule Update: " + update);
    // }

    @GetMapping("/{detail}")
    public ResponseEntity<String> getScheduleDetail(@PathVariable String detail) {
        return ResponseEntity.ok(detail);
    }

}