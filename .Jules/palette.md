## 2026-04-15 - Interactive Love Quote
**Learning:** Turning a static text block into an interactive element requires careful consideration of semantics (role=button, tabindex=0), keyboard support (Enter/Space to trigger), clear focus states (focus-visible to avoid outline for mouse users but keep it for keyboard), and discoverability (a subtle hint text that appears on hover/focus). The emoji ❤️ was also completely ignored or poorly read by screen readers; wrapping it in `<span role="img" aria-label="love">\❤️</span>` ensures it is announced correctly.
**Action:** Always add keyboard listeners when converting non-button elements into interactive ones, use `:focus-visible` for keyboard accessibility, and always explicitly label emojis.

## 2026-04-15 - Accessible Name Computation for Buttons
**Learning:** Adding an `aria-label` directly to a container with `role="button"` overrides the child text nodes during Accessible Name Computation. This causes screen readers to completely skip reading the inner content (like a text quote) and only read the label.
**Action:** Use `aria-describedby` pointing to a visible or visually hidden hint text element instead of `aria-label` when the element's child text nodes contain critical primary content that needs to be read.

## 2026-04-18 - Contextual Input Hints & Live Regions
**Learning:** For interactive elements, users interacting via keyboard need different hints than mouse users (e.g., "Press Enter" vs "Click"). Using the CSS `:focus-visible` pseudo-class allows for pure-CSS toggling of these contextual hints. Additionally, when a user triggers an interaction that dynamically updates content on the page (like fetching a new quote) without moving focus, screen readers may remain silent. Adding `aria-live="polite"` to the container ensures the updated text is announced.
**Action:** Use pure CSS (`:focus-visible` vs normal hover) to display input-specific hints, and ensure dynamic text updates use `aria-live` to remain accessible to screen readers.
