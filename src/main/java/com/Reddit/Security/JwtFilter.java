package com.Reddit.Security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final String SECRET =
            "mysecretkeymysecretkeymysecretkey";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        String email = null;
        String token = null;

        // Bearer token
        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            token = authHeader.substring(7);

            try {

                Claims claims =
                        Jwts.parserBuilder()
                                .setSigningKey(
                                        SECRET.getBytes()
                                )
                                .build()
                                .parseClaimsJws(token)
                                .getBody();

                email = claims.getSubject();

            } catch (Exception e) {

                System.out.println("Invalid Token");
            }
        }

        // set authentication
        if (email != null &&
                SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

            User user =
                    new User(
                            email,
                            "",
                            Collections.emptyList()
                    );

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            user.getAuthorities()
                    );

            authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder.getContext()
                    .setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }
}