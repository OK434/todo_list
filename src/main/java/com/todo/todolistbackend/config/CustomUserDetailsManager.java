package com.todo.todolistbackend.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

public class CustomUserDetailsManager extends JdbcUserDetailsManager {

    public CustomUserDetailsManager(DataSource dataSource) {
        super(dataSource);

        setUsersByUsernameQuery("SELECT email, password, true as enabled FROM users WHERE email = ?");
        setUserExistsSql("SELECT email FROM users WHERE email = ?");
    }

    @Override
    public void createUser(UserDetails user) {
    }

    @Override
    protected List<GrantedAuthority> loadUserAuthorities(String username) {
        return new ArrayList<>();
    }
}
