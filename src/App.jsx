import { motion } from "framer-motion";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "linear-gradient(135deg, #000000, #430000, #7a0000)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >

      {/* BACKGROUND STRIPES */}
      <div
        style={{
          position: "absolute",
          top: "-20vh",
          left: "-20vw",
          width: "160vw",
          height: "160vh",
          background: "linear-gradient(45deg, rgba(255,0,0,0.15), transparent)",
          transform: "rotate(-15deg)",
          zIndex: 0,
        }}
      />

      {/* RIGHT-SIDE ANIME SHADOW */}
      <motion.img
        src="https://i.ibb.co/6Y6Q5fM/anime-silhouette-shadow.png"
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 0.25, x: 0 }}
        transition={{ duration: 1.2 }}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: "95vh",
          maxHeight: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* FLOATING PARTICLES */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3 + i * 0.15, repeat: Infinity }}
          style={{
            width: "6px",
            height: "6px",
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            top: `${20 + i * 2}%`,
            left: `${5 + i * 3}%`,
            zIndex: 2,
          }}
        />
      ))}

      {/* ============================
              HERO SECTION
      ============================= */}
      <section
        style={{
          width: "100%",
          padding: "120px 40px",
          position: "relative",
          zIndex: 10,
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            fontSize: "90px",
            fontWeight: "900",
            letterSpacing: "4px",
            lineHeight: "0.95",
            textShadow: "0 0 25px rgba(255,0,0,0.5)",
            maxWidth: "900px",
          }}
        >
          CHRYSALIS 2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontSize: "26px",
            marginTop: "25px",
            maxWidth: "700px",
            opacity: 0.85,
          }}
        >
          National Creative Writing & Media Olympiad  
          <br />
          A battle of imagination. A clash of art. A festival of stories.
        </motion.p>

        <motion.a
          href="mailto:ecsa@christuniversity.in"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "45px",
            display: "inline-block",
            padding: "18px 45px",
            fontSize: "24px",
            fontWeight: "800",
            background: "#ff1a1a",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(255,0,0,0.7)",
            color: "white",
            textDecoration: "none",
          }}
        >
          Submit Your Entry →
        </motion.a>

      </section>

      {/* THE REST OF YOUR SECTIONS GO HERE — UNCHANGED */}
      {/* (categories, why participate, rules, contact, footer) */}
    </div>
  );
}
