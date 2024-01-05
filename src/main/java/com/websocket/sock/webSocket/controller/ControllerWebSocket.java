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
    
    @MessageMapping("/web")
    @SendTo("/firstTopic/sendMessage")
    public Response send( Request request) throws Exception {
        log.info( "Th First Method");
        return new Response( request.getText());
    }

    @MessageMapping("/end")
    @SendTo("/firstTopic/send")
    public Response messageTwo( Request request) throws Exception {
        log.info( "The Second Method");
        return new Response( request.getText());
    }

}
