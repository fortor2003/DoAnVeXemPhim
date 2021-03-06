package pl.banhangtichluy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.banhangtichluy.entity.User;
import pl.banhangtichluy.reponsitory.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username, User.class).orElseThrow(() -> new UsernameNotFoundException("Username not exist"));
        List<GrantedAuthority> authorities = new ArrayList<>();
        List<String> roleNames = userRepository.roleNamesById(user.getId());
        List<String> permissionNames = userRepository.permissionNamesById(user.getId());
        for (String name : roleNames) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + name));
        }
        for (String name : permissionNames) {
            authorities.add(new SimpleGrantedAuthority(name));
        }
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), true, true, true, true, authorities);
    }
}
