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
        quoteAuthor: document.querySelector('.quote-author')
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

    // Initialize
    function init() {
        updateTimer();
        setInterval(updateTimer, MS_PER_SECOND);
        displayRandomQuote();

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
