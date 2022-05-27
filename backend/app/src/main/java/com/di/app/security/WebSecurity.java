package com.di.app.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder passwordEncoder;

//    public WebSecurity(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
//        this.userDetailsService = userDetailsService;
//        this.passwordEncoder = passwordEncoder;
//    }


    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.cors().and().csrf().disable().authorizeRequests()
//                .anyRequest().authenticated()
//                .and()
//                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
//                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
//                // this disables session creation on Spring Security
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//    }



//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        CorsConfiguration config = new CorsConfiguration();
//        config.applyPermitDefaultValues();
//        config.addExposedHeader("Authorization");
//        config.setAllowCredentials(true);
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
}
