import { useEffect, useRef } from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import SplitText from "../components/SplitText.jsx";
import { BiUser } from "react-icons/bi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function AboutSection({ isSmallScreen }) {
  const aboutSectionRef = useRef(null);
  const aboutHeadingRef = useRef(null);

  useEffect(() => {
    const aboutEl = aboutSectionRef.current;
    if (!aboutEl) return;

    // Animate blur + opacity on scroll
    gsap.fromTo(
      aboutEl,
      { opacity: 0, filter: "blur(20px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: aboutEl,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Heading blur + transparency while scrolling into the About section
  useEffect(() => {
    const heading = aboutHeadingRef.current;
    const section = aboutSectionRef.current;
    if (!heading || !section) return;

    // Make the heading fade / unblur in as the About section scrolls into view
    const hTween = gsap.fromTo(
      heading,
      { opacity: 0, filter: "blur(8px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    return () => {
      try {
        hTween.scrollTrigger && hTween.scrollTrigger.kill();
      } catch (e) {}
      try {
        hTween.kill && hTween.kill();
      } catch (e) {}
    };
  }, []);

  // Blur the banner elements as the About section scrolls into view (lighter blur + no heavy blurs on small screens)
  useEffect(() => {
    const about = aboutSectionRef.current;
    const home = document.getElementById("home");
    const main = document.querySelector(".home-main");
    const profile = document.querySelector(".home-profile");
    // try both the wrapper and the inner LiquidEther if present
    const bgWrapper = document.querySelector(".home-bg-wrapper");
    const bg = document.querySelector(".home-bg") || bgWrapper;

    if (!about || !home) return;

    // Skip heavy blurs on small screens — keep effect light on desktop
    if (isSmallScreen) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: about,
        start: "top 85%",
        end: "top 30%",
        scrub: true,
      },
    });

    // lighter blur values to reduce paint cost and visual heaviness
    if (main)
      tl.to(main, { filter: "blur(3px)", opacity: 0.92, ease: "none" }, 0);
    if (profile)
      tl.to(profile, { filter: "blur(2px)", opacity: 0.95, ease: "none" }, 0);
    if (bg)
      tl.to(
        bg,
        { filter: "blur(2px) saturate(90%)", opacity: 0.97, ease: "none" },
        0
      );
    tl.to(home, { filter: "blur(1px)", opacity: 0.99, ease: "none" }, 0);

    return () => {
      try {
        tl.scrollTrigger && tl.scrollTrigger.kill();
      } catch (e) {}
      try {
        tl.kill && tl.kill();
      } catch (e) {}
    };
  }, [isSmallScreen]);

  return (
    <div
      ref={aboutSectionRef}
      style={{
        width: "100%",
        height: isSmallScreen ? "auto" : "100vh",
        minHeight: isSmallScreen ? "auto" : "100vh",
        backgroundColor: "#000000d5",
        position: "relative",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "80px",
        // padding: "100px 35.2px",
       
      }}
      id="about"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div className="section-header" style={{
            marginBottom: "22px",
            display: "flex",
            alignItems: "center",
            gap: "22px",
             marginTop: "60px",
          }}>
          <div className="section-icon" style={{
              width: "61.6px",
              height: "61.6px",
              /* keep a light translucent gradient on mobile for contrast */
              background: "linear-gradient(135deg, rgba(82, 39, 255, 0.12), rgba(157, 78, 221, 0.12))",
              border: "1px solid rgba(82, 39, 255, 0.18)",
              borderRadius: "15.4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(82, 39, 255, 0.8)",
              backdropFilter: "blur(10px)",
              fontSize: "26.4px",
            }}>
            <BiUser size={28} />
          </div>
          <div>
            <h2 ref={aboutHeadingRef} className="section-title" style={{
                color: "white",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "2.75rem",
                fontWeight: 700,
                margin: 0,
              }}>
              About
            </h2>
            <p className="section-subtitle" style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.99rem",
                fontWeight: 400,
                margin: "6px 0 0 0",
              }}>
              Get to know me and my journey
            </p>
          </div>
        </div>

        <div
          className="about-content"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "40px",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <div
            className="about-left"
            style={{
              maxWidth: isSmallScreen ? "100%" : "55%",
              marginTop: "5rem",
              textAlign: isSmallScreen ? "center" : "left",
              padding: isSmallScreen ? "0 20px" : "0",
            }}
          >
            <SplitText
              text={"Building Meaningful Digital Experiences"}
              tag="h2"
              className=""
              delay={60}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-100px"
              textAlign={isSmallScreen ? "center" : "left"}
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <div
              style={{
                fontSize: "1.3rem",
                marginTop: "20px",
                lineHeight: "1.7",
              }}
            >
              <ScrollReveal
                tag="div"
                textClassName="body"
                enableBlur={false}
                baseOpacity={0.95}
                baseRotation={2}
                rotationEnd="top 60%"
                wordAnimationEnd="top 30%"
              >
                {
                  "I'm a creative front-end developer passionate about building modern and responsive web experiences. My journey began with a love for design and evolved into a deep curiosity for how the web works — combining logic with creativity to bring ideas to life."
                }
              </ScrollReveal>
              <ScrollReveal
                tag="div"
                textClassName="body"
                enableBlur={false}
                baseOpacity={0.95}
                baseRotation={2}
                rotationEnd="top 60%"
                wordAnimationEnd="top 30%"
              >
                {
                  "When I'm not coding, I enjoy learning new technologies and exploring better ways to make the web faster and more engaging. I believe in continuous learning, attention to detail, and the power of clean, meaningful design. I also like Web3 and blockchain."
                }
              </ScrollReveal>
            </div>
          </div>
          {!isSmallScreen && (
            <div
              className="about-content-right"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "40%",
                height: "auto",
              }}
            >
            </div>
          )}
        </div>

        {!isSmallScreen && (
          <div
            style={{
              width: "100%",
              height: "0px",
              display: "flex",
              alignItems: "center",
              marginTop: "0px",
            }}
          >
          </div>
        )}
      </div>
    </div>
  );
}