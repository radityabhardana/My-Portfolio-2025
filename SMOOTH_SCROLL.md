Smooth scrolling implemented
==========================

What I changed
--------------

- Added a lightweight hook: `src/hooks/useSmoothScroll.js`.
  - Intercepts wheel and touch events (non-passive) and animates `window.scrollTo()` with a lerp easing.
  - Uses real window scroll so all existing fixed elements keep their behavior — this is important for your layout (nav, profile card, etc.).
  - Safe to use with GSAP / ScrollTrigger because it updates the real scroll position.

- Enabled a CSS fallback: `html { scroll-behavior: smooth; }` in `src/index.css` for native smooth anchor navigation.

How to tune behavior
--------------------

You can tweak smoothing via the options you pass to the hook inside `src/App.jsx`:

- `ease` — how quickly the animated scroll eases into the target (0..1). Use smaller numbers for a softer, longer smoothing.
- `mouseMultiplier` — scales wheel delta (higher = more aggressive per wheel tick).
- `touchMultiplier` — scales touch drag delta (higher = more aggressive).

Example usage (already added):

useSmoothScroll({ ease: 0.12, mouseMultiplier: 1, touchMultiplier: 2 })

Notes / tradeoffs
-----------------

- This hook intentionally doesn't transform the whole page (so position:fixed still works as expected). It animates the real window scroll; that keeps ScrollTrigger and other scroll listeners compatible.
- We attach non-passive wheel/touch listeners and call preventDefault. That is needed to capture wheel/touch and animate manually. The implementation focuses on a smooth, natural feeling but doesn't attempt to replace all edge cases (e.g. very large programmatic scroll jumps).

If you'd like a transform-based approach with pinch/overscroll inertia and scroll snapping, I can add a transform-based scroller that wires into ScrollTrigger via scrollerProxy — but that requires additional adjustments to fixed elements.
