package com.example.betmaster.wallet.model;

import com.example.betmaster.user.model.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "wallets")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    private User owner;

    private BigDecimal balance;

    private LocalDateTime createdOn;

    private LocalDateTime updatedOn;


    public Wallet() {
    }

    public UUID getId() {
        return id;
    }

    public Wallet setId(UUID id) {
        this.id = id;
        return this;
    }

    public User getOwner() {
        return owner;
    }

    public Wallet setOwner(User owner) {
        this.owner = owner;
        return this;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public Wallet setBalance(BigDecimal balance) {
        this.balance = balance;
        return this;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public Wallet setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public Wallet setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
        return this;
    }
}
