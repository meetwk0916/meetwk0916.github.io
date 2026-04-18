/**
 * Walter & Selina Love Timer
 * Calculates time elapsed since June 15, 2015
 * and displays romantic quotes.
 */

(function () {
    'use strict';

    // Configuration
    // Use explicit local date constructor to avoid timezone ambiguity
    // Month is 0-indexed: 5 = June
    const MEET_DATE = new Date(2015, 5, 15, 0, 0, 0);
    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;

    // Love quotes collection
    const loveQuotes = [
        { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
        { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
        { text: "I have found the one whom my soul loves.", author: "Song of Solomon" },
        { text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
        { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
        { text: "You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.", author: "Oscar Wilde" },
        { text: "If I know what love is, it is because of you.", author: "Hermann Hesse" },
        { text: "I would rather spend one lifetime with you, than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
        { text: "You are my sun, my moon, and all my stars.", author: "E.E. Cummings" },
        { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
        { text: "Love isn't something you find. Love is something that finds you.", author: "Loretta Young" },
        { text: "The greatest thing you'll ever learn is just to love and be loved in return.", author: "Eden Ahbez" },
        { text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.", author: "Angelita Lim" },
        { text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known—and even that is an understatement.", author: "F. Scott Fitzgerald" },
        { text: "For the two of us, home isn't a place. It is a person. And we are finally home.", author: "Stephanie Perkins" },
        { text: "I've tried so many times to think of a new way to say it, and it's still I love you.", author: "Zelda Fitzgerald" },
        { text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.", author: "Leo Christopher" },
        { text: "If you live to be a hundred, I want to live to be a hundred minus one day so I never have to live without you.", author: "A.A. Milne" },
        { text: "To the world you may be one person, but to one person you are the world.", author: "Bill Wilson" },
        { text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.", author: "Unknown" }
    ];

    // Cache DOM elements
    const els = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        quote: document.getElementById('loveQuote'),
        quoteText: document.querySelector('.quote-text'),
        quoteAuthor: document.querySelector('.quote-author'),
        anniversaryBanner: document.getElementById('anniversaryBanner'),
        milestoneInfo: document.getElementById('milestoneInfo'),
        confettiCanvas: document.getElementById('confettiCanvas')
    };

    let lastQuoteIndex = -1;

    /**
     * Updates the timer display with elapsed time.
     */
    function updateTimer() {
        const now = new Date();
        const diff = now - MEET_DATE;

        const days = Math.floor(diff / MS_PER_DAY);
        const hours = Math.floor((diff % MS_PER_DAY) / MS_PER_HOUR);
        const minutes = Math.floor((diff % MS_PER_HOUR) / MS_PER_MINUTE);
        const seconds = Math.floor((diff % MS_PER_MINUTE) / MS_PER_SECOND);

        if (els.days) els.days.textContent = days.toLocaleString();
        if (els.hours) els.hours.textContent = hours.toString().padStart(2, '0');
        if (els.minutes) els.minutes.textContent = minutes.toString().padStart(2, '0');
        if (els.seconds) els.seconds.textContent = seconds.toString().padStart(2, '0');
    }

    /**
     * Displays a random love quote, avoiding immediate repetition.
     */
    function displayRandomQuote() {
        if (!els.quoteText || !els.quoteAuthor) return;

        let randomIndex;
        if (loveQuotes.length > 1) {
            do {
                randomIndex = Math.floor(Math.random() * loveQuotes.length);
            } while (randomIndex === lastQuoteIndex);
        } else {
            randomIndex = 0;
        }
        lastQuoteIndex = randomIndex;

        const quote = loveQuotes[randomIndex];

        // Fade out
        els.quoteText.style.opacity = '0';
        els.quoteAuthor.style.opacity = '0';

        setTimeout(() => {
            els.quoteText.textContent = '"' + quote.text + '"';
            els.quoteAuthor.textContent = '— ' + quote.author;
            // Fade in
            els.quoteText.style.opacity = '1';
            els.quoteAuthor.style.opacity = '1';
        }, 300);
    }

    /**
     * Handles keyboard interaction for the quote widget.
     * @param {KeyboardEvent} e
     */
    function handleQuoteKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            displayRandomQuote();
        }
    }

    /**
     * Returns the ordinal suffix for a number (1st, 2nd, 3rd, 4th).
     * @param {number} n
     * @returns {string}
     */
    function getOrdinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    /**
     * Calculates anniversary information.
     * @returns {{isAnniversary: boolean, years: number, nextDate: Date, daysUntil: number}}
     */
    function getAnniversaryInfo() {
        const now = new Date();
        const todayYear = now.getFullYear();
        const todayMonth = now.getMonth();
        const todayDate = now.getDate();

        const meetYear = MEET_DATE.getFullYear();
        const meetMonth = MEET_DATE.getMonth();
        const meetDay = MEET_DATE.getDate();

        const yearsTogether = todayYear - meetYear;
        const isAnniversary = todayMonth === meetMonth && todayDate === meetDay;

        let nextAnniversary = new Date(todayYear, meetMonth, meetDay);
        if (nextAnniversary < now) {
            nextAnniversary = new Date(todayYear + 1, meetMonth, meetDay);
        }
        const daysUntil = Math.ceil((nextAnniversary - now) / MS_PER_DAY);

        return { isAnniversary, years: yearsTogether, nextDate: nextAnniversary, daysUntil };
    }

    /**
     * Lightweight canvas confetti + hearts animation.
     */
    class Confetti {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.running = false;
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticle() {
            const colors = ['#f093fb', '#f5576c', '#FFE66D', '#ffffff', '#ff6b6b', '#4ecdc4'];
            const isHeart = Math.random() < 0.3;
            return {
                x: Math.random() * this.canvas.width,
                y: -20,
                size: Math.random() * 8 + 4,
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 4 - 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                isHeart: isHeart
            };
        }

        start(duration = 8000) {
            this.running = true;
            const endTime = Date.now() + duration;
            const spawnInterval = setInterval(() => {
                if (Date.now() >= endTime) {
                    clearInterval(spawnInterval);
                }
                for (let i = 0; i < 3; i++) {
                    this.particles.push(this.createParticle());
                }
            }, 100);
            this.animate();
            setTimeout(() => { this.running = false; }, duration + 2000);
        }

        drawHeart(ctx, x, y, size) {
            ctx.beginPath();
            const topCurveHeight = size * 0.3;
            ctx.moveTo(x, y + topCurveHeight);
            ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
            ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size * 0.8), x, y + size);
            ctx.bezierCurveTo(x, y + (size * 0.8), x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
            ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
            ctx.closePath();
            ctx.fill();
        }

        animate() {
            if (!this.running && this.particles.length === 0) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                return;
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.003;

                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.opacity);
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate((p.rotation * Math.PI) / 180);
                this.ctx.fillStyle = p.color;
                if (p.isHeart) {
                    this.drawHeart(this.ctx, 0, 0, p.size);
                } else {
                    this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                }
                this.ctx.restore();

                if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
                    this.particles.splice(i, 1);
                }
            }
            requestAnimationFrame(() => this.animate());
        }
    }

    /**
     * Initializes anniversary milestones display and effects.
     */
    function initMilestones() {
        const info = getAnniversaryInfo();
        const banner = els.anniversaryBanner;
        const milestone = els.milestoneInfo;
        const timerCard = document.querySelector('.timer-card');

        if (info.isAnniversary && info.years > 0) {
            if (banner) {
                const ordinal = getOrdinal(info.years);
                banner.innerHTML = '<div class="anniversary-title">Happy ' + ordinal + ' Anniversary!</div>' +
                    '<div class="anniversary-subtitle">' + info.years + ' years of love and counting</div>';
                banner.classList.add('is-visible');
            }
            if (timerCard) timerCard.classList.add('is-anniversary');
            if (els.confettiCanvas) {
                const confetti = new Confetti(els.confettiCanvas);
                confetti.start(10000);
            }
        } else {
            if (milestone) {
                const nextOrdinal = getOrdinal(info.years + 1);
                const nextDateStr = info.nextDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                milestone.innerHTML = '<span class="milestone-label">Next milestone:</span> ' +
                    '<span class="milestone-value">' + nextOrdinal + ' Anniversary on ' + nextDateStr + ' — ' + info.daysUntil + ' days to go</span>';
                milestone.classList.add('is-visible');
            }
        }
    }

    // Initialize
    function init() {
        updateTimer();
        setInterval(updateTimer, MS_PER_SECOND);
        displayRandomQuote();
        initMilestones();

        if (els.quote) {
            els.quote.addEventListener('click', displayRandomQuote);
            els.quote.addEventListener('keydown', handleQuoteKeydown);
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
