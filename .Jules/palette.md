## 2026-04-15 - Interactive Love Quote
**Learning:** Turning a static text block into an interactive element requires careful consideration of semantics (role=button, tabindex=0), keyboard support (Enter/Space to trigger), clear focus states (focus-visible to avoid outline for mouse users but keep it for keyboard), and discoverability (a subtle hint text that appears on hover/focus). The emoji ❤️ was also completely ignored or poorly read by screen readers; wrapping it in `<span role="img" aria-label="love">\❤️</span>` ensures it is announced correctly.
**Action:** Always add keyboard listeners when converting non-button elements into interactive ones, use `:focus-visible` for keyboard accessibility, and always explicitly label emojis.

## 2026-04-15 - Accessible Name Computation for Buttons
**Learning:** Adding an `aria-label` directly to a container with `role="button"` overrides the child text nodes during Accessible Name Computation. This causes screen readers to completely skip reading the inner content (like a text quote) and only read the label.
**Action:** Use `aria-describedby` pointing to a visible or visually hidden hint text element instead of `aria-label` when the element's child text nodes contain critical primary content that needs to be read.

## 2026-04-16 - Contextual Input Hints and aria-live Announcements
**Learning:** Using generic "Click for another quote" text can be confusing for keyboard/screen reader users. Combining `.hint-mouse` and `.hint-keyboard` spans that toggle based on `:hover` vs `:focus-visible` provides context-aware guidance. Furthermore, dynamically changing text via JavaScript isn't announced automatically by screen readers unless `aria-live="polite"` is explicitly set on the container.
**Action:** When creating custom interactive elements with both mouse and keyboard support, use CSS to display input-specific hints (like "Press Enter"). Always add `aria-live="polite"` to text nodes that update asynchronously without a page reload so screen readers announce the changes.
