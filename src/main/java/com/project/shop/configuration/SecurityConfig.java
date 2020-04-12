package com.project.shop.configuration;

import com.project.shop.model.Enum.Roles;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserPrincipalDetailsService userPrincipalDetailsService;

    public SecurityConfig(UserPrincipalDetailsService userPrincipalDetailsService) {
        this.userPrincipalDetailsService = userPrincipalDetailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

//        http.cors()
//                .and()
//                .csrf().disable()
//                .httpBasic()
//                .and()
//                .authorizeRequests()
//                .mvcMatchers(HttpMethod.GET, "/user/**").permitAll()
//                .mvcMatchers("/user/login", "/user/create").permitAll()
//                .mvcMatchers(HttpMethod.GET,"/products/**").permitAll()
//                .mvcMatchers(HttpMethod.GET,"/cartProduct/**").permitAll()
//                .mvcMatchers(HttpMethod.GET,"/category/**").permitAll()
//                .mvcMatchers(HttpMethod.GET,"/api/images").permitAll()
//                .mvcMatchers(HttpMethod.GET,"/size/**").permitAll()
//                .mvcMatchers(HttpMethod.OPTIONS,"/**").permitAll()
//                .anyRequest().authenticated();


        http.authorizeRequests()
                .antMatchers("/h2-console/**").hasAuthority(String.valueOf(Roles.ADMIN))
                .antMatchers("/h2-console").hasAuthority(String.valueOf(Roles.ADMIN))

                .antMatchers("/").permitAll()
                .and().formLogin();

        http.csrf().disable();
        http.headers().frameOptions().disable();
    }


    @Bean
    DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(getPasswordEncoder());
        daoAuthenticationProvider.setUserDetailsService(this.userPrincipalDetailsService);

        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
