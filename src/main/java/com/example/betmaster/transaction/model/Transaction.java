package com.example.betmaster.transaction.model;

import com.example.betmaster.user.model.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private User user;

    private String description;

    private TransactionType type;

    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    private LocalDateTime createdOn;


    public Transaction() {
    }


    public UUID getId() {
        return id;
    }

    public Transaction setId(UUID id) {
        this.id = id;
        return this;
    }

    public User getUser() {
        return user;
    }

    public Transaction setUser(User user) {
        this.user = user;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Transaction setDescription(String description) {
        this.description = description;
        return this;
    }

    public TransactionType getType() {
        return type;
    }

    public Transaction setType(TransactionType type) {
        this.type = type;
        return this;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public Transaction setStatus(TransactionStatus status) {
        this.status = status;
        return this;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public Transaction setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
        return this;
    }
}
