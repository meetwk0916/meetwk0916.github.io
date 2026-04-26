## 2026-04-15 - Interactive Love Quote
**Learning:** Turning a static text block into an interactive element requires careful consideration of semantics (role=button, tabindex=0), keyboard support (Enter/Space to trigger), clear focus states (focus-visible to avoid outline for mouse users but keep it for keyboard), and discoverability (a subtle hint text that appears on hover/focus). The emoji ❤️ was also completely ignored or poorly read by screen readers; wrapping it in `<span role="img" aria-label="love">\❤️</span>` ensures it is announced correctly.
**Action:** Always add keyboard listeners when converting non-button elements into interactive ones, use `:focus-visible` for keyboard accessibility, and always explicitly label emojis.

## 2026-04-15 - Accessible Name Computation for Buttons
**Learning:** Adding an `aria-label` directly to a container with `role="button"` overrides the child text nodes during Accessible Name Computation. This causes screen readers to completely skip reading the inner content (like a text quote) and only read the label.
**Action:** Use `aria-describedby` pointing to a visible or visually hidden hint text element instead of `aria-label` when the element's child text nodes contain critical primary content that needs to be read.

## 2026-04-26 - Contextual Input Hints and Dynamic Live Regions
**Learning:** When creating interactive UI elements, providing different hints based on the input method (e.g., "Press Enter" for keyboard users, "Click" for mouse users) enhances usability. This can be achieved gracefully using CSS `:focus-visible` to display the appropriate hint without JavaScript overhead. Additionally, dynamically updating text content (like quotes) requires `aria-live="polite"` on the container to ensure screen readers announce the new content seamlessly without interrupting the user.
**Action:** Use CSS pseudo-classes (`:focus-visible` vs normal hover) to provide contextual interaction guidance, and ensure dynamic text containers have `aria-live` attributes to maintain screen reader accessibility.
