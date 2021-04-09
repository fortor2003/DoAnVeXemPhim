package pl.banhangtichluy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity{

    @Column(name = "username")
    @JsonProperty(value = "username")
    private String username;

    @Column(name = "password")
    @JsonProperty(value = "password")
    @JsonIgnore
    private String password;

    @Column(name = "firstName")
    @JsonProperty(value = "firstName")
    private String firstName;

    @Column(name = "lastName")
    @JsonProperty(value = "lastName")
    private String lastName;

    @Column(name = "email")
    @JsonProperty(value = "email")
    private String email;

    @Column(name = "phone")
    @JsonProperty(value = "phone")
    private String phone;

    @OneToMany(mappedBy = Amount_.CREATED_BY, fetch = FetchType.LAZY)
    private List<Amount> createdAmounts;

    @OneToMany(mappedBy = Amount_.UPDATED_AT, fetch = FetchType.LAZY)
    private List<Amount> updatedAmounts;

}
