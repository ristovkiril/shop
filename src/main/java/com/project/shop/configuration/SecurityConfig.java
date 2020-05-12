package com.project.shop.configuration;

import com.project.shop.filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserPrincipalDetailsService userPrincipalDetailsService;

    private final JwtFilter jwtFilter;

    public SecurityConfig(UserPrincipalDetailsService userPrincipalDetailsService, JwtFilter jwtFilter) {
        this.userPrincipalDetailsService = userPrincipalDetailsService;
        this.jwtFilter = jwtFilter;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors()
                .and()
                .csrf().disable()
                .httpBasic()
                .and()
                .authorizeRequests()
                .mvcMatchers(HttpMethod.GET, "/user/**").permitAll()
                .mvcMatchers("/user/login*", "/user/create*", "/user/token*").permitAll()
                .mvcMatchers(HttpMethod.GET,"/products/**").permitAll()
                .mvcMatchers(HttpMethod.GET,"/cart/**").permitAll()
                .mvcMatchers(HttpMethod.GET,"/cartProduct/**").permitAll()
                .mvcMatchers(HttpMethod.GET,"/category/**").permitAll()
                .mvcMatchers(HttpMethod.GET,"/api/images/**").permitAll()
                .mvcMatchers(HttpMethod.GET,"/size/**").permitAll()
                .mvcMatchers(HttpMethod.OPTIONS,"/**").permitAll()
                .anyRequest().authenticated()
                .and().exceptionHandling()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);


//        http.authorizeRequests()
//                .antMatchers("/h2-console/**").hasAuthority(String.valueOf(Roles.ADMIN))
//                .antMatchers("/h2-console").hasAuthority(String.valueOf(Roles.ADMIN))
//
//                .antMatchers("/").permitAll()
//                .and().formLogin();
//
//        http.csrf().disable();
//        http.headers().frameOptions().disable();
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
