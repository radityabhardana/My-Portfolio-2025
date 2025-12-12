import LiquidEther from "./components/LiquidEther.jsx";
import LightBackground from "./components/LightBackground.jsx";
import TextType from "./components/TextType.jsx";
import GooeyNav from "./components/GooeyNav.jsx";
import BlurText from "./components/BlurText.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import DecayCard from "./components/DecayCard.jsx";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiFigma,
} from "react-icons/si";
import { BiUser } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi2";
import MusicCard from "./components/MusicCard.jsx";
import ScrollReveal from "./components/ScrollReveal.jsx";
import SplitText from "./components/SplitText.jsx";
import SkillsCarousel from "./components/SkillsCarousel.jsx";
import Certificates from "./components/Certificates.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import { useEffect, useRef, useState } from "react";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurvedLoop from "./components/CurvedLoop.jsx";

gsap.registerPlugin(ScrollTrigger);

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const items = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const handleDownloadCV = () => {
  const driveUrl =
    "https://drive.google.com/file/d/10FVaJjarlM4uBpKV_2pwQYOyQ7Ba8P6c/view?usp=drive_link";
  // open in new tab with safe noopener
  if (typeof window !== "undefined") {
    window.open(driveUrl, "_blank", "noopener,noreferrer");
  }
};

export default function App() {
  // enable global smoothing for wheel / touch scroll
  // tweak parameters if you want a stiffer or looser feel
  useSmoothScroll({ ease: 0.12, mouseMultiplier: 1, touchMultiplier: 2 });
  // tune LiquidEther rendering quality based on device capabilities
  // (avoid heavy WebGL simulation on very small / low-memory devices)
  let liquidResolution = 0.5;
  let liquidIterationsPoisson = 32;
  let liquidIterationsViscous = 32;
  let liquidAutoDemo = true;
  let liquidAutoIntensity = 2.2;

  try {
    const mem =
      typeof navigator !== "undefined" && navigator.deviceMemory
        ? navigator.deviceMemory
        : 4;
    const cores =
      typeof navigator !== "undefined" && navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency
        : 4;
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 900 || /Mobi|Android/i.test(navigator.userAgent));

    // favor lower quality on mobile or low-memory devices
    if (isMobile || mem < 4 || cores < 2) {
      liquidResolution = 0.35;
      liquidIterationsPoisson = 12;
      liquidIterationsViscous = 12;
      liquidAutoDemo = false;
      liquidAutoIntensity = 1.2;
    } else if (mem < 8 || cores < 4) {
      // medium settings for mid-range devices
      liquidResolution = 0.45;
      liquidIterationsPoisson = 20;
      liquidIterationsViscous = 20;
      liquidAutoDemo = true;
      liquidAutoIntensity = 1.6;
    }
  } catch (e) {
    // ignore and use defaults
  }
  // small/mobile detection (used to choose a lightweight fallback)
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const check = () => {
      const isS =
        typeof window !== "undefined" &&
        (window.innerWidth < 900 || /Mobi|Android/i.test(navigator.userAgent));
      setIsSmallScreen(isS);
    };
    check();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }
  }, []);
  const aboutSectionRef = useRef(null);
  const aboutHeadingRef = useRef(null);
  const skillsRef = useRef(null);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const scrollTimeoutRef = useRef(null);

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

  // Track which section is in view and update active nav
  useEffect(() => {
    const handleScroll = () => {
      const homeEl = document.getElementById("home");
      const aboutEl = document.getElementById("about");
      const skillsEl = document.getElementById("skills");
      const certificatesEl = document.getElementById("certificates");
      const projectsEl = document.getElementById("projects");
      const contactEl = document.getElementById("contact");

      const scrollPos = window.scrollY + 200; // offset for nav height

      // Determine which section is currently in view
      let currentIndex = 0;
      if (contactEl && scrollPos >= contactEl.offsetTop) {
        currentIndex = 5; // Contact
      } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
        currentIndex = 4; // Projects
      } else if (certificatesEl && scrollPos >= certificatesEl.offsetTop) {
        currentIndex = 3; // Certificates
      } else if (skillsEl && scrollPos >= skillsEl.offsetTop) {
        currentIndex = 2; // Skills
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        currentIndex = 1; // About
      } else {
        currentIndex = 0; // Home (default)
      }

      setActiveNavIndex(currentIndex);
    };

    // Throttle scroll event for performance
    const throttledScroll = () => {
      if (scrollTimeoutRef.current) return;
      handleScroll();
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 100);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Blur the banner elements as the About section scrolls into view
  useEffect(() => {
    const about = aboutSectionRef.current;
    const home = document.getElementById("home");
    const main = document.querySelector(".home-main");
    const profile = document.querySelector(".home-profile");
    // try both the wrapper and the inner LiquidEther if present
    const bgWrapper = document.querySelector(".home-bg-wrapper");
    const bg = document.querySelector(".home-bg") || bgWrapper;

    if (!about || !home) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: about,
        start: "top 85%",
        end: "top 30%",
        scrub: true,
      },
    });

    if (main)
      tl.to(main, { filter: "blur(6px)", opacity: 0.86, ease: "none" }, 0);
    if (profile)
      tl.to(profile, { filter: "blur(5px)", opacity: 0.9, ease: "none" }, 0);
    if (bg)
      tl.to(
        bg,
        { filter: "blur(6px) saturate(80%)", opacity: 0.95, ease: "none" },
        0
      );
    tl.to(home, { filter: "blur(3px)", opacity: 0.98, ease: "none" }, 0);

    return () => {
      try {
        tl.scrollTrigger && tl.scrollTrigger.kill();
      } catch (e) {}
      try {
        tl.kill && tl.kill();
      } catch (e) {}
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* Banner Section - Fixed */}

      <div
        style={
          isSmallScreen
            ? {
                position: "fixed",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 400,
                width: "calc(100% - 32px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                background: "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.3))",
                borderRadius: "10px",
                padding: "8px 12px",
              }
            : {
                position: "fixed",
                alignItems: "center",
                top: "22px",
                display: "flex",
                justifyContent: "center",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 400,
                textDecoration: "none",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.5), rgba(27, 27, 27, 0.3))",
                borderRadius: "13.2px",
                padding: "11px 17.6px",
              }
        }
      >
          <GooeyNav
          items={items}
            particleCount={isSmallScreen ? 3 : 15}
          particleDistances={[90, 10]}
          particleR={100}
          activeIndex={activeNavIndex}
          onActiveChange={(idx) => {
            setActiveNavIndex(idx);
            const href = items[idx]?.href;
            if (href && href.startsWith("#")) {
              const el = document.querySelector(href);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* Banner Section - Fixed */}
      <div
        style={{ width: "100%", height: "100vh", position: "relative" }}
        id="home"
      >
        <div
          className="home-main"
          style={
            isSmallScreen
              ? {
                  position: "relative",
                  left: "auto",
                  top: "auto",
                  transform: "none",
                  zIndex: 10,
                  paddingTop: "28px",
                  paddingBottom: "8px",
                  margin: "0 16px",
                }
              : {
                  position: "fixed",
                  left: "10%",
                  top: "51%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }
          }
        >
          <BlurText
            tag="h1"
            text={"Hi, I'm Raditya"}
            className="h1"
            delay={60}
            animateBy="chars"
            stepDuration={0.2}
            animationFrom={{ filter: "blur(14px)", opacity: 0, y: -20 }}
            animationTo={[
              { filter: "blur(6px)", opacity: 0.4, y: 6 },
              { filter: "blur(0px)", opacity: 1, y: 0 },
            ]}
            onAnimationComplete={() =>
              console.log("Heading animation finished")
            }
            style={{
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "5.5rem",
              fontWeight: 600,
              margin: 0,
            }}
          />
          <TextType
            text={[
              "Web Enthusiast",
              "Frontend Developer",
              "Software Engineer",
              "UI/UX Designer",
            ]}
            typingSpeed={90}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
          <p
            style={{
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 200,
              margin: "11px 0px",
            }}
          >
            I create beutiful, function, and user-centerd digital experiences.{" "}
            <br />
            With 1 and half years of experiences in web Development, I bring
            ideas <br />
            to life through clean code and thoughtful design
          </p>
          <div style={{ display: "flex", gap: "16.5px", marginTop: "16.5px" }}>
            <div className="glass-card">
              <span style={{ fontSize: "1.1rem", marginRight: "11px" }}>
                <i class="bi bi-geo-alt-fill"></i>
              </span>
              <span>Based in Indonesia</span>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: "1.1rem", marginRight: "11px" }}>
                <i class="bi bi-briefcase-fill"></i>
              </span>
              <span>Ready to work</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "16.5px", marginTop: "27.5px" }}>
            <button className="btn-primary">
              <i class="bi bi-arrow-right" style={{ marginRight: "10px" }}></i>
              Hire Me
            </button>
            <button className="btn-secondary" onClick={handleDownloadCV}>
              <i class="bi bi-download" style={{ marginRight: "10px" }}></i>
              Download CV
            </button>
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              marginTop: "33px",
              paddingTop: "33px",
            }}
          >
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.99rem",
                fontWeight: 500,
                margin: "-5.5px 0 16.5px 0",
              }}
            >
              Follow Me
            </p>
            <div style={{ display: "flex", gap: "16.5px" }}>
              <a
                href="https://www.linkedin.com/in/raditya-hardana-962373382/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i class="bi bi-linkedin"></i>
              </a>
              <a
                href="https://github.com/radityabhardana"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i class="bi bi-github"></i>
              </a>
           
              <a
                href="https://www.instagram.com/zxlyn_16/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i class="bi bi-instagram"></i>
              </a>
              <a href="https://wa.me/628892274986" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i class="bi bi-whatsapp"></i>
                </a>
            </div>
          </div>
        </div>
        <div
          className="home-profile"
          style={
            isSmallScreen
              ? {
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "24px",
                  zIndex: 120,
                }
              : {
                  position: "fixed",
                  top: "20%",
                  right: "10%",
                  zIndex: 100,
                }
          }
        >
          <ProfileCard
            name="Raditya Bagus Hardana"
            title="Software Engineer"
            handle="javicodes"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/img/bosganteng.png"
            iconUrl="/img/tag_card.png"
            iconSize="320%"
            showUserInfo={false}
            enableTilt={true}
            behindGlowSize="10%"
            behindGlowEnabled={true}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
          />
        </div>

        <div
          className="home-bg-wrapper"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {/* render heavy LiquidEther on desktop — use CSS-only fallback on small screens */}
          {!isSmallScreen ? (
            <LiquidEther
            className="home-bg"
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={liquidIterationsViscous}
            iterationsPoisson={liquidIterationsPoisson}
            resolution={liquidResolution}
            isBounce={false}
            autoDemo={liquidAutoDemo}
            autoSpeed={0.5}
            autoIntensity={liquidAutoIntensity}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            />
          ) : (
            <LightBackground className="home-bg-fallback" />
          )}
        </div>

        {/* Mouse Scroll Icon */}
        <div
          className="scroll-indicator"
          style={{
            position: "fixed",
            bottom: "55px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "11px",
          }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.99rem",
              fontWeight: 500,
              margin: 0,
              letterSpacing: "1.1px",
            }}
          >
            SCROLL
          </p>
        </div>
      </div>

      {/* Now Playing / Music Card */}
      <MusicCard
        albumArt="/img/cover.png"
        title="Palace"
        artist="ADTurnUp"
        audioSrc="/file/Palace (Slowed + Reverb) - ADTurnUp.mp3"
        initiallyPlaying={false}
      />

      {/* About Section */}
      <div
        ref={aboutSectionRef}
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#000000d5",
          position: "relative",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "80px",
          padding: "80px 35.2px",
        }}
        id="about"
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            marginBottom: "22px",
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <div
            style={{
              width: "61.6px",
              height: "61.6px",
              background:
                "linear-gradient(135deg, rgba(82, 39, 255, 0.2), rgba(157, 78, 221, 0.2))",
              border: "1px solid rgba(82, 39, 255, 0.3)",
              borderRadius: "15.4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(82, 39, 255, 0.8)",
              backdropFilter: "blur(10px)",
              fontSize: "26.4px",
            }}
          >
            <BiUser size={28} />
          </div>
          <div>
            <h2
              ref={aboutHeadingRef}
              style={{
                color: "white",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "2.75rem",
                fontWeight: 700,
                margin: 0,
              }}
            >
              About
            </h2>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.99rem",
                fontWeight: 400,
                margin: "6px 0 0 0",
              }}
            >
              Get to know me and my journey
            </p>
          </div>
        </div>

        <div
          className="about-content"
          style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "40px" }}
        >
          <div className="about-left" style={{ maxWidth: "55%", marginTop:"5rem" }}>
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
              textAlign="left"
              marginTop="1rem"
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
                {"I'm a creative front-end developer passionate about building modern and responsive web experiences. My journey began with a love for design and evolved into a deep curiosity for how the web works — combining logic with creativity to bring ideas to life."}
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
                  {"When I'm not coding, I enjoy learning new technologies and exploring better ways to make the web faster and more engaging. I believe in continuous learning, attention to detail, and the power of clean, meaningful design. I also like Web3 and blockchain."}
              </ScrollReveal>
            </div>
          </div>
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
            <DecayCard />
          </div>
        </div>

        <div style={{ width: "100%", height: "80px", display: "flex", alignItems: "center", marginTop: "100px" }}>
          <CurvedLoop
            marqueeText="Raditya ✦ Bagus ✦ Hardana ✦"
            speed={3}
            curveAmount={100}
            direction="right"
            interactive={true}
            className="custom-text-style"
          />
        </div>
        </div>
      </div>

      {/* Skills Section */}
      <section
        style={{
          width: "100%",
          height: "100vh",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.5))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "66px 35.2px",
        }}
        id="skills"
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              marginBottom: "55px",
            }}
          >
            <div
              style={{
                width: "61.6px",
                height: "61.6px",
                background:
                  "linear-gradient(135deg, rgba(82, 39, 255, 0.2), rgba(157, 78, 221, 0.2))",
                border: "1px solid rgba(82, 39, 255, 0.3)",
                borderRadius: "15.4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(82, 39, 255, 0.8)",
                backdropFilter: "blur(10px)",
                fontSize: "26.4px",
              }}
            >
              <HiSparkles size={28} />
            </div>
            <div>
              <h1
                style={{
                  color: "white",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "2.75rem",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Skillset
              </h1>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.99rem",
                  fontWeight: 400,
                  margin: "6px 0 0 0",
                }}
              >
                Technologies and tools I work with
              </p>
            </div>
          </div>
          <SkillsCarousel />
        </div>
      </section>

      {/* Certificates Section */}
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "88px 35.2px",
        }}
        id="certificates"
      >
        <Certificates />
      </section>

      {/* Projects Section */}
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.0))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "88px 35.2px",
        }}
        id="projects"
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <Projects />
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
