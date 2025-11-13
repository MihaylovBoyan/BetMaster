package com.example.betmaster.bet.model;

import com.example.betmaster.user.model.User;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bets")
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private BetStatus status;

    @Column(nullable = false)
    private BigDecimal odds;

    @Column(nullable = false)
    private BigDecimal potentialWin;

    @Column(nullable = false)
    private BigDecimal stake;

    @Column(nullable = false)
    private LocalDateTime placedOn;

    @Column
    private LocalDateTime settledOn;

    @ManyToOne
    private User user;


    public Bet() {
    }

    public UUID getId() {
        return id;
    }

    public Bet setId(UUID id) {
        this.id = id;
        return this;
    }

    public BetStatus getStatus() {
        return status;
    }

    public Bet setStatus(BetStatus status) {
        this.status = status;
        return this;
    }

    public BigDecimal getOdds() {
        return odds;
    }

    public Bet setOdds(BigDecimal odds) {
        this.odds = odds;
        return this;
    }

    public BigDecimal getPotentialWin() {
        return potentialWin;
    }

    public Bet setPotentialWin(BigDecimal potentialWin) {
        this.potentialWin = potentialWin;
        return this;
    }

    public BigDecimal getStake() {
        return stake;
    }

    public Bet setStake(BigDecimal stake) {
        this.stake = stake;
        return this;
    }

    public LocalDateTime getPlacedOn() {
        return placedOn;
    }

    public Bet setPlacedOn(LocalDateTime placedOn) {
        this.placedOn = placedOn;
        return this;
    }

    public LocalDateTime getSettledOn() {
        return settledOn;
    }

    public Bet setSettledOn(LocalDateTime settledOn) {
        this.settledOn = settledOn;
        return this;
    }

    public User getUser() {
        return user;
    }

    public Bet setUser(User user) {
        this.user = user;
        return this;
    }
}
