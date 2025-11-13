package com.example.betmaster.user.model;

import com.example.betmaster.bet.model.Bet;
import com.example.betmaster.wallet.model.Wallet;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column(unique = true)
    private String email;

    @Column
    private String profilePicture;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(nullable = false)
    private LocalDateTime registeredOn;

    @Column(nullable = false)
    private LocalDateTime updatedOn;

    @OneToOne(mappedBy = "owner")
    private Wallet wallet;

    //orderByNewest maybe here?
    @OneToMany(mappedBy = "user")
    private List<Bet> bets = new ArrayList<>();

    public User() {
    }

    public UUID getId() {
        return id;
    }

    public User setId(UUID id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public User setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public User setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public User setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public UserRole getRole() {
        return role;
    }

    public User setRole(UserRole role) {
        this.role = role;
        return this;
    }

    public LocalDateTime getRegisteredOn() {
        return registeredOn;
    }

    public User setRegisteredOn(LocalDateTime registeredOn) {
        this.registeredOn = registeredOn;
        return this;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public User setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
        return this;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public User setWallet(Wallet wallet) {
        this.wallet = wallet;
        return this;
    }

    public List<Bet> getBets() {
        return bets;
    }

    public User setBets(List<Bet> bets) {
        this.bets = bets;
        return this;
    }
}
