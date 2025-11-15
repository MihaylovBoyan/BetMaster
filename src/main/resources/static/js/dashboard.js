// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Bet slip data
    let betSlip = [];
    
    // DOM Elements
    const sportItems = document.querySelectorAll('.sport-item');
    const eventCards = document.querySelectorAll('.event-card');
    const oddsButtons = document.querySelectorAll('.odds-btn');
    const betslipContent = document.getElementById('betslipContent');
    const betslipEmpty = document.getElementById('betslipEmpty');
    const betslipBets = document.getElementById('betslipBets');
    const betslipFooter = document.getElementById('betslipFooter');
    const clearBetslipBtn = document.getElementById('clearBetslip');
    const stakeInput = document.getElementById('stakeInput');
    const totalOddsSpan = document.getElementById('totalOdds');
    const potentialWinSpan = document.getElementById('potentialWin');
    const placeBetBtn = document.getElementById('placeBetBtn');
    const eventsTitle = document.getElementById('eventsTitle');
    const eventsContainer = document.getElementById('eventsContainer');
    const viewToggleBtns = document.querySelectorAll('.toggle-btn');

    // Sport filter functionality
    sportItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active state
            sportItems.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected sport
            const selectedSport = this.getAttribute('data-sport');
            
            // Update events title
            if (selectedSport === 'all') {
                eventsTitle.textContent = 'All Events';
            } else {
                const sportName = this.querySelector('.sport-name').textContent;
                eventsTitle.textContent = sportName + ' Events';
            }
            
            // Filter events
            filterEvents(selectedSport);
        });
    });

    // Filter events by sport
    function filterEvents(sport) {
        eventCards.forEach(card => {
            if (sport === 'all' || card.getAttribute('data-sport') === sport) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // View toggle (List/Grid)
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.getAttribute('data-view');
            if (view === 'grid') {
                eventsContainer.classList.add('grid-view');
            } else {
                eventsContainer.classList.remove('grid-view');
            }
        });
    });

    // Odds button click handler
    oddsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            const selection = this.getAttribute('data-team') || this.getAttribute('data-selection');
            const odds = parseFloat(this.getAttribute('data-odds'));
            
            // Get event info
            const eventCard = this.closest('.event-card');
            const eventSport = eventCard.querySelector('.event-sport').textContent;
            const eventDate = eventCard.querySelector('.event-date').textContent;
            const teamSections = eventCard.querySelectorAll('.team-section');
            let eventName = '';
            if (teamSections.length >= 2) {
                const team1 = teamSections[0].querySelector('.team-name').textContent;
                const team2 = teamSections[1].querySelector('.team-name').textContent;
                eventName = `${team1} vs ${team2}`;
            }

            // Check if bet already exists
            const existingBetIndex = betSlip.findIndex(bet => 
                bet.eventId === eventId && bet.selection === selection
            );

            if (existingBetIndex > -1) {
                // Remove bet
                removeBet(existingBetIndex);
                this.classList.remove('selected');
            } else {
                // Add bet
                const bet = {
                    eventId: eventId,
                    eventName: eventName,
                    eventSport: eventSport,
                    eventDate: eventDate,
                    selection: selection,
                    odds: odds
                };
                
                betSlip.push(bet);
                this.classList.add('selected');
                updateBetSlip();
            }
        });
    });

    // Update bet slip display
    function updateBetSlip() {
        if (betSlip.length === 0) {
            betslipEmpty.style.display = 'block';
            betslipBets.innerHTML = '';
            betslipFooter.style.display = 'none';
        } else {
            betslipEmpty.style.display = 'none';
            betslipFooter.style.display = 'block';
            renderBets();
            calculateTotal();
        }
    }

    // Render bets in bet slip
    function renderBets() {
        betslipBets.innerHTML = '';
        
        betSlip.forEach((bet, index) => {
            const betItem = document.createElement('div');
            betItem.className = 'bet-item';
            betItem.innerHTML = `
                <div class="bet-item-header">
                    <div class="bet-item-info">
                        <div class="bet-selection">${bet.selection}</div>
                        <div class="bet-event">${bet.eventName}</div>
                    </div>
                    <button class="remove-bet" data-index="${index}" aria-label="Remove bet">×</button>
                </div>
                <div class="bet-odds">
                    <span class="bet-odds-label">Odds:</span>
                    <span class="bet-odds-value">${bet.odds.toFixed(2)}</span>
                </div>
            `;
            betslipBets.appendChild(betItem);
        });

        // Add remove button listeners
        document.querySelectorAll('.remove-bet').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeBet(index);
            });
        });
    }

    // Remove bet from bet slip
    function removeBet(index) {
        const bet = betSlip[index];
        betSlip.splice(index, 1);
        
        // Remove selected class from odds button
        oddsButtons.forEach(btn => {
            const eventId = btn.getAttribute('data-event-id');
            const selection = btn.getAttribute('data-team') || btn.getAttribute('data-selection');
            if (eventId === bet.eventId && selection === bet.selection) {
                btn.classList.remove('selected');
            }
        });
        
        updateBetSlip();
    }

    // Calculate total odds and potential win
    function calculateTotal() {
        const totalOdds = betSlip.reduce((acc, bet) => acc * bet.odds, 1);
        totalOddsSpan.textContent = totalOdds.toFixed(2);
        
        const stake = parseFloat(stakeInput.value) || 0;
        const potentialWin = totalOdds * stake;
        potentialWinSpan.textContent = potentialWin.toFixed(2);
    }

    // Stake input change handler
    stakeInput.addEventListener('input', function() {
        if (betSlip.length > 0) {
            calculateTotal();
        }
    });

    // Clear bet slip
    clearBetslipBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all bets?')) {
            betSlip = [];
            oddsButtons.forEach(btn => btn.classList.remove('selected'));
            updateBetSlip();
        }
    });

    // Place bet button
    placeBetBtn.addEventListener('click', function() {
        const stake = parseFloat(stakeInput.value);
        
        if (!stake || stake <= 0) {
            alert('Please enter a valid stake amount');
            stakeInput.focus();
            return;
        }
        
        if (betSlip.length === 0) {
            alert('Please add at least one bet to your bet slip');
            return;
        }
        
        // TODO: Implement actual bet placement logic here
        // For now, just show confirmation
        const totalOdds = betSlip.reduce((acc, bet) => acc * bet.odds, 1);
        const potentialWin = totalOdds * stake;
        
        if (confirm(`Place bet with stake $${stake.toFixed(2)}?\nPotential win: $${potentialWin.toFixed(2)}`)) {
            // Reset bet slip
            betSlip = [];
            oddsButtons.forEach(btn => btn.classList.remove('selected'));
            stakeInput.value = '';
            updateBetSlip();
            
            alert('Bet placed successfully!');
        }
    });

    // Mobile bet slip toggle (for mobile view)
    function toggleBetSlip() {
        const betslipSidebar = document.querySelector('.betslip-sidebar');
        if (window.innerWidth <= 1024) {
            betslipSidebar.classList.toggle('show');
        }
    }

    // Show bet slip button on mobile (you can add a floating button if needed)
    if (window.innerWidth <= 1024 && betSlip.length > 0) {
        // You can add a floating action button here to toggle bet slip
    }
});

