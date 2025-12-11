import { motion } from "framer-motion";
import { useEffect } from "react";

export default function App() {
  // VHS STATIC EFFECT (adds flicker)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes vhsFlicker {
        0% { opacity: 0.95; }
        5% { opacity: 0.85; }
        10% { opacity: 0.9; }
        15% { opacity: 0.7; }
        20% { opacity: 0.92; }
        100% { opacity: 0.95; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "black",
        color: "white",
        overflowX: "hidden",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >

      {/* 🔥 FLOATING RED FOG LAYER */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.35] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "120%",
          height: "120%",
          background: "url('https://i.ibb.co/K6Z2kTL/redfog.png')",
          backgroundSize: "cover",
          filter: "blur(12px)",
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* 🔥 UPSIDE DOWN PORTAL GLOW */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: "fixed",
          top: "-10%",
          left: "-20%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(rgba(255,0,0,0.35), transparent)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* 🔥 MIND FLAYER SHADOW SILHOUETTE */}
      <motion.img
        src="https://i.ibb.co/HpWQzJp/mindflayer.png"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ duration: 4 }}
        style={{
          position: "fixed",
          right: "-5vw",
          top: "0",
          height: "90vh",
          opacity: 0.15,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* 🔥 STATIC OVERLAY */}
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.03] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{
          position: "fixed",
          inset: 0,
          background: "url('https://i.ibb.co/0jVhYjH/static.gif')",
          mixBlendMode: "screen",
          opacity: 0.03,
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* ************************************* */}
      {/*               NAVBAR                  */}
      {/* ************************************* */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 20,
          padding: "18px 40px",
          background: "rgba(0,0,0,0.6)",
          borderBottom: "1px solid rgba(255,0,0,0.3)",
          backdropFilter: "blur(6px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <motion.h1
          whileHover={{ scale: 1.05, textShadow: "0 0 20px red" }}
          style={{
            fontFamily: "'Cinzel', serif",
            color: "red",
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "4px",
            textShadow: "0 0 12px rgba(255,0,0,0.6)",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          CHRYSALIS
        </motion.h1>

        <div style={{ display: "flex", gap: "30px" }}>
          {[
            ["About", "about"],
            ["Categories", "categories"],
            ["Rules", "rules"],
            ["Submit", "submit"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.2, color: "red" }}
              style={{
                cursor: "pointer",
                fontSize: "18px",
                opacity: 0.85,
              }}
              onClick={() =>
                document.getElementById(id).scrollIntoView({ behavior: "smooth" })
              }
            >
              {label}
            </motion.div>
          ))}
        </div>
      </nav>

      {/* ************************************* */}
      {/*               HERO SECTION             */}
      {/* ************************************* */}

      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 60px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "20px" }}
          animate={{ opacity: 1, letterSpacing: "6px" }}
          transition={{ duration: 1.8 }}
          style={{
            fontSize: "90px",
            fontFamily: "'Cinzel', serif",
            color: "red",
            textShadow: "0 0 25px rgba(255,0,0,0.8)",
          }}
        >
          CHRYSALIS 2026
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            fontSize: "28px",
            marginTop: "20px",
            opacity: 0.85,
          }}
        >
          National Creative Writing & Media Olympiad
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px red" }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            document.getElementById("about").scrollIntoView({
              behavior: "smooth",
            })
          }
          style={{
            marginTop: "50px",
            padding: "18px 40px",
            fontSize: "22px",
            background: "red",
            borderRadius: "10px",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "700",
            textTransform: "uppercase",
          }}
        >
          Enter the Upside Down →
        </motion.button>
      </section>
