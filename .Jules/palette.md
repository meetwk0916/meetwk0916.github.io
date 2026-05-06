## 2026-04-15 - Interactive Love Quote
**Learning:** Turning a static text block into an interactive element requires careful consideration of semantics (role=button, tabindex=0), keyboard support (Enter/Space to trigger), clear focus states (focus-visible to avoid outline for mouse users but keep it for keyboard), and discoverability (a subtle hint text that appears on hover/focus). The emoji ❤️ was also completely ignored or poorly read by screen readers; wrapping it in `<span role="img" aria-label="love">\❤️</span>` ensures it is announced correctly.
**Action:** Always add keyboard listeners when converting non-button elements into interactive ones, use `:focus-visible` for keyboard accessibility, and always explicitly label emojis.

## 2026-04-15 - Accessible Name Computation for Buttons
**Learning:** Adding an `aria-label` directly to a container with `role="button"` overrides the child text nodes during Accessible Name Computation. This causes screen readers to completely skip reading the inner content (like a text quote) and only read the label.
**Action:** Use `aria-describedby` pointing to a visible or visually hidden hint text element instead of `aria-label` when the element's child text nodes contain critical primary content that needs to be read.

## 2026-04-16 - Dynamic Content & Keyboard Interaction Hints
**Learning:** For dynamic content that updates without a page reload (like quotes), screen readers need `aria-live="polite"` to know when to announce the new content without interrupting the user. Additionally, interaction hints for keyboard users are just as important as those for mouse users.
**Action:** Use `aria-live="polite"` on containers where text content changes dynamically. Ensure that interaction hints explicitly state both mouse (e.g., "Click") and keyboard (e.g., "press Enter") triggers to be inclusive of all users navigating interactive elements.
