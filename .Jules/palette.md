## 2026-04-15 - Interactive Love Quote
**Learning:** Turning a static text block into an interactive element requires careful consideration of semantics (role=button, tabindex=0), keyboard support (Enter/Space to trigger), clear focus states (focus-visible to avoid outline for mouse users but keep it for keyboard), and discoverability (a subtle hint text that appears on hover/focus). The emoji ❤️ was also completely ignored or poorly read by screen readers; wrapping it in `<span role="img" aria-label="love">\❤️</span>` ensures it is announced correctly.
**Action:** Always add keyboard listeners when converting non-button elements into interactive ones, use `:focus-visible` for keyboard accessibility, and always explicitly label emojis.

## 2026-04-15 - Accessible Name Computation for Buttons
**Learning:** Adding an `aria-label` directly to a container with `role="button"` overrides the child text nodes during Accessible Name Computation. This causes screen readers to completely skip reading the inner content (like a text quote) and only read the label.
**Action:** Use `aria-describedby` pointing to a visible or visually hidden hint text element instead of `aria-label` when the element's child text nodes contain critical primary content that needs to be read.

## 2024-05-18 - Contextual Input Hints & Dynamic Content Announcements
**Learning:** When creating interactive UI elements, displaying generic hints (like "Click for another quote") can be confusing or exclusionary for keyboard or screen reader users. Furthermore, dynamically changing text content within these interactive elements might not be read out unless properly marked up.
**Action:** Use CSS pseudo-classes (`:focus-visible` vs normal hover) to display contextual input hints based on the user's input method (e.g., showing 'Press Enter' only when focused via a keyboard). Add `aria-live="polite"` to containers where the text content updates dynamically so that screen readers announce the new text appropriately.
