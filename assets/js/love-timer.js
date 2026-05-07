/**
 * Walter & Selina Love Timer
 * Apple Design Style — https://meetwk0916.github.io/
 * 
 * Calculates time elapsed since June 15, 2015,
 * displays romantic quotes, and triggers confetti on anniversaries.
 * 
 * All functionality preserved from the original.
 */

(function () {
    'use strict';

    // ─── Configuration ───────────────────────────────────────
    /** Start date: June 15, 2015 (month is 0-indexed) */
    var MEET_DATE = new Date(2015, 5, 15, 0, 0, 0);
    var MS_DAY  = 86400000;
    var MS_HOUR = 3600000;
    var MS_MIN  = 60000;
    var MS_SEC  = 1000;

    // ─── Love Quotes ─────────────────────────────────────────
    var loveQuotes = [
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

    // ─── DOM Cache ───────────────────────────────────────────
    var els = {};

    function cacheDom() {
        els.days      = document.getElementById('days');
        els.hours     = document.getElementById('hours');
        els.minutes   = document.getElementById('minutes');
        els.seconds   = document.getElementById('seconds');
        els.quote     = document.getElementById('loveQuote');
        els.quoteText = document.querySelector('.quote-text');
        els.quoteAuthor = document.querySelector('.quote-author');
        els.banner    = document.getElementById('anniversaryBanner');
        els.milestone = document.getElementById('milestoneInfo');
        els.timerCard = document.querySelector('.timer-card');
        els.canvas    = document.getElementById('confettiCanvas');
    }

    var lastQuoteIdx = -1;

    // ─── Timer ───────────────────────────────────────────────
    function updateTimer() {
        var now = Date.now();
        var diff = now - MEET_DATE.getTime();

        var days    = Math.floor(diff / MS_DAY);
        var hours   = Math.floor((diff % MS_DAY) / MS_HOUR);
        var minutes = Math.floor((diff % MS_HOUR) / MS_MIN);
        var seconds = Math.floor((diff % MS_MIN) / MS_SEC);

        if (els.days)    els.days.textContent    = days.toLocaleString();
        if (els.hours)   els.hours.textContent   = String(hours).padStart(2, '0');
        if (els.minutes) els.minutes.textContent = String(minutes).padStart(2, '0');
        if (els.seconds) els.seconds.textContent = String(seconds).padStart(2, '0');
    }

    // ─── Quotes ──────────────────────────────────────────────
    function showQuote() {
        if (!els.quoteText || !els.quoteAuthor) return;

        var idx;
        if (loveQuotes.length > 1) {
            do { idx = Math.floor(Math.random() * loveQuotes.length); }
            while (idx === lastQuoteIdx);
        } else {
            idx = 0;
        }
        lastQuoteIdx = idx;
        var q = loveQuotes[idx];

        // Crossfade
        els.quoteText.style.opacity = '0';
        els.quoteAuthor.style.opacity = '0';

        setTimeout(function () {
            els.quoteText.textContent = '\u201c' + q.text + '\u201d';
            els.quoteAuthor.textContent = '\u2014 ' + q.author;
            els.quoteText.style.opacity = '1';
            els.quoteAuthor.style.opacity = '1';
        }, 250);
    }

    // ─── Anniversary ─────────────────────────────────────────
    function getOrdinal(n) {
        var s = ['th', 'st', 'nd', 'rd'];
        var v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    function getAnniversaryInfo() {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth();
        var d = now.getDate();

        var my = MEET_DATE.getFullYear();
        var mm = MEET_DATE.getMonth();
        var md = MEET_DATE.getDate();

        var years = y - my;
        var isAnniv = (m === mm && d === md);

        var next = new Date(y, mm, md);
        if (next < now) next = new Date(y + 1, mm, md);
        var daysUntil = Math.ceil((next - now) / MS_DAY);

        return { isAnniversary: isAnniv, years: years, nextDate: next, daysUntil: daysUntil };
    }

    function initMilestones() {
        var info = getAnniversaryInfo();
        var banner = els.banner;
        var milestone = els.milestone;
        var card = els.timerCard;

        if (info.isAnniversary && info.years > 0) {
            var ord = getOrdinal(info.years);
            banner.innerHTML =
                '<div class="anniversary-title">Happy ' + ord + ' Anniversary!</div>' +
                '<div class="anniversary-subtitle">' + info.years + ' years of love and counting</div>';
            banner.classList.add('is-visible');

            if (card) card.classList.add('is-anniversary');

            if (els.canvas) {
                startConfetti(els.canvas, 10000);
            }
        } else {
            var nextOrd = getOrdinal(info.years + 1);
            var dateStr = info.nextDate.toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
            });
            milestone.innerHTML =
                '<span class="milestone-label">Next milestone:</span> ' +
                '<span class="milestone-value">' + nextOrd + ' Anniversary on ' + dateStr +
                ' \u2014 ' + info.daysUntil + ' days to go</span>';
            milestone.classList.add('is-visible');
        }
    }

    // ─── Confetti Particle System ────────────────────────────
    function startConfetti(canvas, duration) {
        var ctx = canvas.getContext('2d');
        var W, H;
        var particles = [];
        var running = true;
        var endTime = Date.now() + duration;

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        var colors = ['#0066cc', '#0071e3', '#2997ff', '#ffffff', '#ff3b30', '#ff9500'];

        function createParticle() {
            var isHeart = Math.random() < 0.25;
            return {
                x: Math.random() * W,
                y: -15,
                size: Math.random() * 7 + 3,
                speedY: Math.random() * 3 + 1.5,
                speedX: Math.random() * 2 - 1,
                rot: Math.random() * 360,
                rotSpeed: Math.random() * 6 - 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                isHeart: isHeart
            };
        }

        function drawHeart(c, x, y, s) {
            c.beginPath();
            var t = s * 0.3;
            c.moveTo(x, y + t);
            c.bezierCurveTo(x, y, x - s/2, y, x - s/2, y + t);
            c.bezierCurveTo(x - s/2, y + (s+t)/2, x, y + s*0.8, x, y + s);
            c.bezierCurveTo(x, y + s*0.8, x + s/2, y + (s+t)/2, x + s/2, y + t);
            c.bezierCurveTo(x + s/2, y, x, y, x, y + t);
            c.closePath();
            c.fill();
        }

        function animate() {
            if (!running && particles.length === 0) {
                ctx.clearRect(0, 0, W, H);
                return;
            }
            ctx.clearRect(0, 0, W, H);
            for (var i = particles.length - 1; i >= 0; i--) {
                var p = particles[i];
                p.y += p.speedY;
                p.x += p.speedX;
                p.rot += p.rotSpeed;
                p.opacity -= 0.003;

                ctx.save();
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.color;
                if (p.isHeart) {
                    drawHeart(ctx, 0, 0, p.size);
                } else {
                    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
                }
                ctx.restore();

                if (p.opacity <= 0 || p.y > H + 20) {
                    particles.splice(i, 1);
                }
            }
            requestAnimationFrame(animate);
        }

        var spawnTimer = setInterval(function () {
            if (Date.now() >= endTime) {
                clearInterval(spawnTimer);
                return;
            }
            for (var i = 0; i < 3; i++) {
                particles.push(createParticle());
            }
        }, 80);

        animate();
        setTimeout(function () { running = false; }, duration + 2000);
    }

    // ─── Keyboard ────────────────────────────────────────────
    function handleQuoteKey(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showQuote();
        }
    }

    // ─── Init ────────────────────────────────────────────────
    function init() {
        cacheDom();
        updateTimer();
        setInterval(updateTimer, 1000);
        showQuote();
        initMilestones();

        if (els.quote) {
            els.quote.addEventListener('click', showQuote);
            els.quote.addEventListener('keydown', handleQuoteKey);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
