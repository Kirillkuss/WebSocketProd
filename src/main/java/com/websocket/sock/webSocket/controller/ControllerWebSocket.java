package com.websocket.sock.webSocket.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import com.websocket.sock.webSocket.request.Request;
import com.websocket.sock.webSocket.response.Response;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@EnableScheduling
@RequiredArgsConstructor
public class ControllerWebSocket {

    private final SimpMessagingTemplate simpMessagingTemplate;
    
    @MessageMapping("/first-end-point")
    @SendTo("/topic/first")
    public Response firstMessage( Request request) throws Exception {
        log.info( "Message 1: " + request.getText() );
        return new Response( request.getText());
    }

    @MessageMapping("/second-end-point")
    @SendTo("/topic/second")
    public Response secondMessage( Request request) throws Exception {
        log.info( "Message 2 >>> " + request.getText() );
        return new Response( request.getText());
    }

    @Scheduled(fixedRate = 3000) 
    public void sendRandomMap() { 
        log.info( " sendRandomMap>> " + getMap() );
        simpMessagingTemplate.convertAndSend("/topic/ticks", getMap() );
    }

    private Map<String, Integer> getMap() {
        Map<String, Integer> ticks = new HashMap<>();
        ticks.put("Index 1", getRandomValue());
        ticks.put("Index 2", getRandomValue());
        ticks.put("Index 3", getRandomValue());
        ticks.put("Index 4", getRandomValue());
        ticks.put("Index 5", getRandomValue());
        ticks.put("Index 6", getRandomValue());
        return ticks;
    }

    private int getRandomValue() {
        return ThreadLocalRandom.current()
                                .nextInt(-100, 100 + 1);
    }
}

