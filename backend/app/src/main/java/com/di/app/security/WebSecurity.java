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
                .antMatchers("/api/users/**").hasAnyAuthority("ADMIN")
                .antMatchers("/api/role/**").hasAnyAuthority("ADMIN")
                .antMatchers("/api/items/**").hasAnyAuthority("ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/users/**").hasAnyAuthority("ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/users/**").hasAnyAuthority("ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/api/users/**").hasAnyAuthority("ADMIN")

                .anyRequest()
                .authenticated()
//                .and()
//                .requiresChannel()
//                .anyRequest()
//                .requiresSecure()
           ;
    }

}
