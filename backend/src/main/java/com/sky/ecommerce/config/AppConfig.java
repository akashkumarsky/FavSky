package com.sky.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class AppConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Stateless session management
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // Authorization rules
                .authorizeHttpRequests(authorize -> authorize
                        // Allow public access to authentication and product endpoints
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        // Secure all other requests
                        .anyRequest().authenticated()
                )
                // Add JWT validation filter
                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
                // Disable CSRF for stateless APIs
                .csrf().disable()
                // Enable CORS
                .cors().configurationSource(corsConfigurationSource())
                .and()
                // Disable HTTP Basic authentication (as we are using JWT)
                .httpBasic().disable();

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allowed origins (added your frontend's origin)
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:4000",
                "http://localhost:5173" 
        ));
        // Allow specific HTTP methods
        configuration.setAllowedMethods(Collections.singletonList("*"));
        // Allow all headers
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        // Allow credentials
        configuration.setAllowCredentials(true);
        // Expose specific headers (e.g., Authorization)
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        // Cache pre-flight requests for 1 hour
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
