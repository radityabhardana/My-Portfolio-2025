import SkillsCarousel from "../components/SkillsCarousel.jsx";
import { HiSparkles } from "react-icons/hi2";

export default function SkillsSection({ isSmallScreen }) {
  return (
    <section
      style={{
        width: "100%",
        height: isSmallScreen ? "auto" : "100vh",
        background: isSmallScreen ? "transparent" : "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.5))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: isSmallScreen ? "40px 20px 80px" : "66px 35.2px",
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
            <HiSparkles size={28} />
          </div>
          <div>
            <h2 className="section-title" style={{
                color: "white",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "2.75rem",
                fontWeight: 700,
                margin: 0,
              }}
            >
Skillset
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
              Technologies and tools I work with
            </p>
          </div>
        </div>
        <SkillsCarousel />
      </div>
    </section>
  );
}