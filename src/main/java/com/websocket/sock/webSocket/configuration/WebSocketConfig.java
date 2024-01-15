package com.websocket.sock.webSocket.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker( @NonNull MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/prefix");
    }

    @Override
    public void registerStompEndpoints( @NonNull StompEndpointRegistry registry) {
        
         registry.addEndpoint("/first-end-point");
         registry.addEndpoint("/first-end-point").withSockJS();
         
         registry.addEndpoint("/second-end-point");
         registry.addEndpoint("/second-end-point").withSockJS();
         
         registry.addEndpoint("/stock-ticks").setAllowedOriginPatterns("*").withSockJS();
    }
}
