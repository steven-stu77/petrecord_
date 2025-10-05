import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Heart, PawPrint, BarChart, FileCheck } from "lucide-react";

import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "../components/MagneticButton";
import TextType from "../components/TextType";
import ScrollVelocity from "../components/ScrollVelocity";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack.";
import dogImg from "../assets/dog.png"; 

interface DashboardProps {}

const STACK_ITEMS = [
  { title: "Pet Records Overview", color: "#c7ddffff" },
  { title: "Step 1: Log Activities", color: "#b1cfbcff" },
  { title: "Step 2: Track Health", color: "#c4b8d0ff" },
  { title: "Step 3: Get Insights", color: "#e6bb9dff" },
];
export function Dashboard(_: DashboardProps) {
  const navigate = useNavigate();
  const onNavigate = (page: string) => {
    // map logical page ids to router paths
    switch (page) {
      case "dashboard":
        navigate("/");
        break;
      case "pets":
        navigate("/petrecord");
        break;
      case "logs":
        // if logs page exists later, update path
        navigate("/logs");
        break;
      case "reports":
        navigate("/reports");
        break;
      default:
        break;
    }
  };
  const { scrollY } = useScroll();

  // Motion transform for hero scroll effect
  const opacity = useTransform(scrollY, [0, 200], [1, 0.4]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);

  // Simple parallax motion (simulating floating paw pattern)
  const [pawX, setPawX] = useState(0);
  const [pawY, setPawY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPawX((e.clientX - window.innerWidth / 2) * 0.03);
      setPawY((e.clientY - window.innerHeight / 2) * 0.03);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 🌈 Reusable background motion style
  const backgroundMotionStyle = (color?: string) => ({
    position: "absolute" as const,
    inset: 0,
    background: color || "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
    opacity: 0.15,
    x: pawX,
    y: pawY,
    zIndex: 0,
  });

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "hidden" }}>
      <Navigation currentPage="dashboard" onNavigate={onNavigate} />
      {/* 🐶 HERO SECTION */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(to bottom right, #e5f1feff, #fce8f3ff, #faebdeff)",
        }}
      >
        {/* Floating icons */}
        <motion.div style={{ ...backgroundMotionStyle(), opacity: 0.08 }}>
          <motion.div
            style={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              fontSize: "3rem",
            }}
            animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🐾
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              bottom: "3rem",
              right: "4rem",
              fontSize: "4rem",
            }}
            animate={{ rotate: [0, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🦴 🐾
          </motion.div>
        </motion.div>

        {/* Foreground hero content */}
        <motion.div
          style={{
            opacity,
            scale,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.img
          src={dogImg}
            alt="Pets"
            style={{
              width: "18rem",
              height: "18rem",
              borderRadius: "9999px",
              objectFit: "cover",
              border: "6px solid white",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              marginBottom: "2rem",
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          ✨
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <TextType
              text={[
                "Track your pet's life",
                "Track your pet's health",
                "Track your pet's moments",
              ]}
              typingSpeed={100}
              deletingSpeed={60}
              pauseDuration={1500}
              loop
              style={{ display: "inline", color: "#000" }}
              textColors={["#000000ff"]}
            />
            <span style={{ margin: "0 4px" }}>&nbsp;</span>
            <span
              style={{
                background: "linear-gradient(to right, #60a5fa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline",
              }}
            >
              beautifully
            </span>
          </div>
          <p
            style={{
              fontSize: "1.25rem",
              color: "rgb(107, 114, 128)",
              marginBottom: "3rem",
              maxWidth: "32rem",
              margin: "0 auto 3rem auto",
              lineHeight: "1.625",
              textAlign: "center",
            }}
          >
            Every wag, every purr, every moment — tracked with care.
          </p>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
            }}
          ></div>
          <MagneticButton
            style={{
              background:
                "linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)",
              color: "white",
              borderRadius: 80,
              padding: "0.75rem 2.5rem",
              boxShadow: "0 4px 16px rgba(139,92,246,0.15)",
            }}
            onClick={() => onNavigate("pets")}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "0.01em",
              }}
            >
              Starting
            </span>
          </MagneticButton>
        </motion.div>
      </section>

      {/* 🩷 WHY PETRECORD SECTION */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "2rem 2rem",
          background: "white",
          gap: "4rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 48,
              marginBottom: 24,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Why PetRecord?
          </h2>
          <p
            style={{
              fontSize: 20,
              color: "black",
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            Because every pet deserves thoughtful care and every moment deserves
            to be remembered
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "4rem",
            zIndex: 5,
            maxWidth: "80rem",
            width: "80%",
            borderColor: "grey",
          }}
        >
          {[
            {
              icon: <Heart />,
              title: "Care Tracking",
              desc: "Log meals, walks, vet visits & moods easily.",
            },
            {
              icon: <BarChart />,
              title: "Analytics",
              desc: "See your pet’s health trends over time.",
            },
            {
              icon: <FileCheck />,
              title: "Reports",
              desc: "Generate detailed vet-ready reports instantly.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              style={{
                background: "white",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  color: "#60a5fa",
                  marginBottom: "1rem",
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#555", fontSize: "1rem" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* how does it work */}
      <section
        style={{
          background: "white",
          padding: "4rem 2rem",
        }}
      >
        <ScrollVelocity
          texts={["⋆˚🐾˖°🦴𓃥𓃠", "DROCERTEP", "⋆˚🐾˖°🦴𓃥𓃠"]}
          velocity={30}
          parallaxStyle={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            overflow: "hidden",
          }}
          scrollerStyle={{
            fontSize: "clamp(1.5rem, 5vw, 3rem)",
            lineHeight: 1.2,
            justifyContent: "center",
            display: "flex",
            gap: "1rem",
            whiteSpace: "nowrap",
            color: "black",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 48,
              marginBottom: 24,
              fontWeight: "bold",
              color: "black",
            }}
          >
            How It Works
          </h2>
          <p
            style={{
              fontSize: 20,
              maxWidth: 800,
              margin: "0 auto",
              color: "black",
            }}
          >
            Four simple steps to better pet care
          </p>
        </div>
      </section>
      {/* demo  */}
      <section>
        <div style={{ position: "relative", background: "black" }}>
          <ScrollStack
            itemDistance={200}
            itemStackDistance={20}
            baseScale={0.85}
            rotationAmount={1}
            blurAmount={0}
            itemScale={0.04}
            useWindowScroll={true}
          >
            {STACK_ITEMS.map((item) => (
              <ScrollStackItem key={item.title}>
                <div
                  style={{
                    backgroundColor: item.color,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    fontSize: "1.5rem",
                    borderRadius: "20px",
                  }}
                >
                  {item.title}
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      <motion.div
        style={{
          position: "relative",
          padding: "128px 0",
          background:
            "linear-gradient(to bottom right, rgb(239 246 255), rgb(253 242 248), rgb(254 252 232))",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div
          style={{
            maxWidth: 896,
            margin: "0 auto",
            paddingLeft: 16,
            paddingRight: 16,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              style={{
                fontSize: 48,
                marginBottom: 24,
                fontWeight: "bold",
                color: "rgb(17 24 39)",
              }}
            >
              Give your pet the care they deserve
            </h2>
            <p
              style={{
                fontSize: 20,
                color: "rgb(75 85 99)",
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              Join thousands of pet parents who trust PetRecord to keep their
              furry friends happy and healthy
            </p>
            <button
              onClick={() => onNavigate("pets")}
              style={{
                background:
                  "linear-gradient(to right, rgb(96 165 250), rgb(244 114 182))",
                color: "white",
                padding: "28px 48px",
                borderRadius: 9999,
                boxShadow:
                  "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                fontSize: 16,
                cursor: "pointer",
                transition: "all 0.5s ease",
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                border: "none",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.10)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                Start Your Journey
                <ArrowRight
                  style={{
                    width: 20,
                    height: 20,
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(8px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                />
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* 🐾 FOOTER SECTION */}
      <footer
        style={{
          background: "linear-gradient(to right, #60a5fa, #f472b6)",
          color: "white",
          textAlign: "center",
          padding: "3rem 1rem",
        }}
      >
        <PawPrint size={32} style={{ marginBottom: "1rem" }} />
        <p>© 2025 PetRecord. Every pet deserves care.</p>
      </footer>
    </div>
  );
}
