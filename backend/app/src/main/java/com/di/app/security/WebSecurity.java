package com.di.app.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;


    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new AuthenticationFilter(authenticationManager()))
                .addFilterAfter(new AuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()

                .antMatchers("/login").permitAll()
                .antMatchers("/api/users/save").permitAll()
                .antMatchers("/api/role/give").permitAll()

                .antMatchers("/api/users/username/**").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/users/id/**").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/users/accepted/**").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/users/update").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/role/update").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/users/**").hasAnyAuthority("ADMIN")
                .antMatchers("/api/items/filter/**").hasAnyAuthority("ADMIN","SELLER","BIDDER","GUEST")
                .antMatchers("/api/items/**").hasAnyAuthority("ADMIN","SELLER","BIDDER","GUEST")
                .antMatchers("/api/messages/**").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/messages/unread/**").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/contacts/**").hasAnyAuthority("ADMIN","SELLER","BIDDER")
                .antMatchers("/api/bids/**").hasAnyAuthority("ADMIN","SELLER","BIDDER","GUEST")

                .anyRequest()
                .authenticated()

           ;
    }

}
