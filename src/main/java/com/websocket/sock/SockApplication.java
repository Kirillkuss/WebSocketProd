package com.websocket.sock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class SockApplication {

	public static void main(String[] args) {
		SpringApplication.run(SockApplication.class, args);
		log.info( "WebSocketProd start!");
	}

}
