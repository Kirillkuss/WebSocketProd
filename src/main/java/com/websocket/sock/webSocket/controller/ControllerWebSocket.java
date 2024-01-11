package com.websocket.sock.webSocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.websocket.sock.webSocket.request.Request;
import com.websocket.sock.webSocket.response.Response;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ControllerWebSocket {
    
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

}
