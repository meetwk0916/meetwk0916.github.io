const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('Quote Widget Accessibility and Guidance', (t) => {
    const indexPath = path.join(__dirname, '../index.html');
    const cssPath = path.join(__dirname, '../assets/css/love-timer.css');

    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    const loveTimerCss = fs.readFileSync(cssPath, 'utf8');

    // Test for aria-live attribute on loveQuote
    assert.ok(
        indexHtml.includes('id="loveQuote" role="button" tabindex="0" aria-describedby="quoteHint" aria-live="polite"'),
        'index.html should have aria-live="polite" on the loveQuote element'
    );

    // Test for contextual hints
    assert.ok(
        indexHtml.includes('<span class="hint-mouse">Click</span>'),
        'index.html should have hint-mouse span'
    );
    assert.ok(
        indexHtml.includes('<span class="hint-keyboard">Press Enter</span>'),
        'index.html should have hint-keyboard span'
    );

    // Test for CSS rules
    assert.ok(
        loveTimerCss.includes('.hint-keyboard {'),
        'love-timer.css should define styles for .hint-keyboard'
    );
    assert.ok(
        loveTimerCss.includes('.quote:focus-visible .hint-mouse {'),
        'love-timer.css should hide hint-mouse on focus-visible'
    );
    assert.ok(
        loveTimerCss.includes('.quote:focus-visible .hint-keyboard {'),
        'love-timer.css should show hint-keyboard on focus-visible'
    );
});
