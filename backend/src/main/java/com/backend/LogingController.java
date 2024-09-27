package com.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogingController {
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@RequestMapping(value = "/loging")
	public void home() {
		System.out.println("LogingController - home() called");
		
		log.trace("trace");
		log.debug("debug");
		log.info("info");
		log.warn("warn");
		log.error("error");
	}
}
