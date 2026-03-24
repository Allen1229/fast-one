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

    // Odometer / Counter Effect for Stats
    const statsSection = document.querySelector('.stats-container');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    if(statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if(current < target) {
                            stat.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target;
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
});
