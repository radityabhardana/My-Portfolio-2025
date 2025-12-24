import { useRef, useEffect, useState, useMemo, useId } from 'react';
import './CurvedLoop.css';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const [pathLength, setPathLength] = useState(0);

  // helper: set startOffset on the <textPath> using percentage when possible
  const setStartOffsetFromPx = (px) => {
    if (!textPathRef.current) return;
    if (pathLength && pathLength > 0) {
      const percent = (px / pathLength) * 100;
      textPathRef.current.setAttribute('startOffset', percent + '%');
    } else {
      textPathRef.current.setAttribute('startOffset', px + 'px');
    }
  };

  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    const calc = () => {
      if (measureRef.current) {
        const len = measureRef.current.getComputedTextLength();
        setSpacing(len);
        // debug: log values when hosted on vercel (helps diagnose deployed size issues)
        try {
          if (typeof window !== 'undefined' && window.location && window.location.hostname.includes('vercel.app')) {
            const svgEl = measureRef.current.ownerSVGElement || measureRef.current.closest('svg');
            const computedFontSize = svgEl ? window.getComputedStyle(svgEl).fontSize : 'unknown';
            // eslint-disable-next-line no-console
            console.debug('[CurvedLoop] measurement:', { len, pathLength: pathRef.current ? (pathRef.current.getTotalLength ? pathRef.current.getTotalLength() : null) : null, computedFontSize });
          }
        } catch (e) {}
      }
    };

    // initial calc
    calc();

    // Recalculate after webfonts are ready - prevents incorrect measurements when fallback font is used initially
    let cancelled = false;
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) calc();
      }).catch(() => {});
      // Try one delayed recalculation as a safety net for environments without FontFaceSet events
      const t = setTimeout(() => { if (!cancelled) calc(); }, 800);

      // Recalc on window resize too
      window.addEventListener('resize', calc);

      // compute path length once SVG path is available (may depend on render timing)
      if (pathRef.current) setPathLength(pathRef.current.getTotalLength());

      return () => {
        cancelled = true;
        clearTimeout(t);
        window.removeEventListener('resize', calc);
      };
    }

    // Fallback: listen for resize only
    window.addEventListener('resize', calc);
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
    return () => window.removeEventListener('resize', calc);
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      offsetRef.current = initial;
      setOffset(initial);
      setStartOffsetFromPx(initial);
    }
  }, [spacing, pathLength]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        let newOffset = offsetRef.current + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        offsetRef.current = newOffset;
        setOffset(newOffset);
        setStartOffsetFromPx(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready, pathLength]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    let newOffset = offsetRef.current + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    offsetRef.current = newOffset;
    setOffset(newOffset);
    setStartOffsetFromPx(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="curved-loop-jacket"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{
            visibility: 'hidden',
            opacity: 0,
            pointerEvents: 'none',
            /* Match the visible text font so measurements are accurate once webfonts load */
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 'inherit',
            letterSpacing: '0.02em',
          }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
