/* d:\F1-2\js\app.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // Gambling Game Catalog using the actual provided images
    const games = [
        { id: 1, title: "SAFARI KING", category: "slot", image: "img/版本2-獅子.png" },
        { id: 2, title: "DARKREEL VAMPIRE", category: "slot", image: "img/版本2-吸血鬼.png" },
        { id: 3, title: "JACKPOT JOKER", category: "slot", image: "img/版本2-小丑.png" },
        { id: 4, title: "ROYAL FISHING", category: "fishing", image: "img/版本2-錢龍.png" },
        { id: 5, title: "ZEUS POWER", category: "slot", image: "img/版本2-宙斯.png" },
        { id: 6, title: "CRASH TOWER", category: "arcade", image: "img/版本2-TOWER.png" },
        { id: 7, title: "CRAZY WHEEL", category: "arcade", image: "img/版本2-WHEEL.png" },
        { id: 8, title: "BOMB FISHING", category: "fishing", image: "img/版本2-炸魚.png" },
        { id: 9, title: "TEXAS HOLD'EM", category: "table", image: "img/版本2-牌類.png" },
        { id: 10, title: "ROYAL ROULETTE", category: "table", image: "img/版本2-輪盤.png" }
    ];

    const gamesGrid = document.getElementById('gamesGrid');
    const tabs = document.querySelectorAll('.tab');

    // Render Games
    function renderGames(filterCategory) {
        gamesGrid.innerHTML = '';
        
        const filteredGames = filterCategory === 'all' 
            ? games 
            : games.filter(game => game.category === filterCategory);

        filteredGames.forEach(game => {
            const card = document.createElement('div');
            card.classList.add('game-card');

            card.innerHTML = `
                <div class="game-img-wrapper">
                    <img src="${game.image}" alt="${game.title}" class="game-img">
                    <div class="game-overlay">
                        <button class="btn btn-primary">PLAY NOW</button>
                    </div>
                </div>
                <div class="game-info">
                    <div class="game-category">${game.category.toUpperCase()}</div>
                    <div class="game-title text-chrome">${game.title}</div>
                </div>
            `;
            
            gamesGrid.appendChild(card);
        });
    }

    renderGames('all');

    // Tab Filtering Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            renderGames(e.target.getAttribute('data-filter'));
        });
    });

    // Sticky navbar effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.borderBottom = '2px solid rgba(229, 9, 20, 0.8)';
            navbar.style.boxShadow = '0 0 15px rgba(229, 9, 20, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.85)';
            navbar.style.borderBottom = '2px solid var(--accent-red)';
            navbar.style.boxShadow = 'var(--neon-glow)';
        }
    });

    // F1 Dashboard Gauge Animation
    const gaugeItems = document.querySelectorAll('.gauge-item');
    let gaugeAnimated = false;

    if(gaugeItems.length > 0) {
        const gaugeObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !gaugeAnimated) {
                gaugeAnimated = true;
                gaugeItems.forEach(item => {
                    const target = +item.getAttribute('data-target');
                    const maxVal = +item.getAttribute('data-max') || target;
                    const color = item.getAttribute('data-color');
                    const fill = item.querySelector('.gauge-fill');
                    const needle = item.querySelector('.gauge-needle');
                    const valueEl = item.querySelector('.gauge-value');

                    // Arc fill based on target / max
                    const pct = Math.min(target / maxVal, 1);
                    const arcOffset = 157 - (157 * pct);
                    
                    // Set gauge color
                    fill.style.stroke = color;
                    fill.style.strokeDashoffset = arcOffset;

                    // Rotate needle: -90deg (left) to +90deg (right)
                    const needleAngle = -90 + (180 * pct);
                    needle.style.transform = `rotate(${needleAngle}deg)`;

                    // Animate number
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    const updateVal = () => {
                        current += increment;
                        if(current < target) {
                            valueEl.innerHTML = Math.ceil(current) + '<span>+</span>';
                            requestAnimationFrame(updateVal);
                        } else {
                            valueEl.innerHTML = target + '<span>+</span>';
                        }
                    };
                    updateVal();
                });
            }
        }, { threshold: 0.5 });
        gaugeObserver.observe(document.querySelector('.stats-container'));
    }

    // ── Partners Flip-Board (split-flap style) ──
    const partners = [
        'EVOLUTION', 'NETENT', 'PRAGMATIC PLAY', 'MICROGAMING',
        'RED TIGER', 'YGGDRASIL', 'PLAY\'N GO', 'QUICKSPIN',
        'BIG TIME GAMING', 'HACKSAW', 'NOLIMIT CITY', 'PUSH GAMING',
        'ELK STUDIOS', 'THUNDERKICK', 'RELAX GAMING', 'ISOFTBET'
    ];

    const flipSlots = document.querySelectorAll('.flip-slot');
    // Assign each slot a shuffled copy and a current index
    const slotState = [];
    flipSlots.forEach((slot, i) => {
        const shuffled = [...partners].sort(() => Math.random() - 0.5);
        slotState.push({ names: shuffled, idx: i % shuffled.length });
        setSlotText(slot, shuffled[i % shuffled.length]);
    });

    function setSlotText(slot, text) {
        const span = slot.querySelector('.flip-text');
        span.textContent = text;
    }

    function flipSlot(slotIndex) {
        const slot = flipSlots[slotIndex];
        const state = slotState[slotIndex];
        
        // Start flip animation
        slot.classList.add('flipping');
        
        setTimeout(() => {
            // Move to next name
            state.idx = (state.idx + 1) % state.names.length;
            setSlotText(slot, state.names[state.idx]);
            slot.classList.remove('flipping');
        }, 300);
    }

    // Synchronized left-to-right wave flip
    function flipWave() {
        flipSlots.forEach((slot, i) => {
            setTimeout(() => {
                flipSlot(i);
            }, i * 150); // 150ms stagger left to right
        });
    }

    // First wave after 2s, then repeat every 4s
    setTimeout(() => {
        flipWave();
        setInterval(flipWave, 4000);
    }, 2000);

});
