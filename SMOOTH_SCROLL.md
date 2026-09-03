Smooth Scrolling & Navigation Stability
=========================================

What was changed & resolved
---------------------------

1. **Native Smooth Scrolling (120Hz Hardware-Accelerated)**:
   - Replaced synthetic lerp scrolljacking with native CSS `html { scroll-behavior: smooth; }`.
   - Restored natural Windows Precision Touchpad and macOS trackpad momentum inertia (no artificial floaty lag or delay).
   - Eliminated `e.preventDefault()` on wheel and touch events, restoring pinch-to-zoom accessibility.

2. **Navigation Lock (`isNavigatingRef`)**:
   - Added programmatic scroll locking during navbar/button clicks in `src/App.jsx`.
   - Prevents scroll listener race conditions where intermediate section offsets would jitter/flicker the active nav indicator while scrolling to the target section.

3. **Layout & Scrollbar Stability**:
   - Added `scrollbar-gutter: stable` to `html` to prevent 17px layout shifts when opening project/certificate modals.
   - Set `body { min-height: 100vh; }` instead of `height: 100%` to ensure accurate document scroll height calculation across all browsers.
   - Hero banner and profile card fadeout is now continuously synchronized with GSAP ScrollTrigger `scrub: true` for flawless visual transitions.
