import { motion } from "framer-motion";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        background: "black",
        color: "white",
        position: "relative",
        fontFamily: "'Cinzel', serif",
      }}
    >

      {/* VHS SCANLINES */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "repeating-linear-gradient(rgba(255,0,0,0.05) 0px, rgba(255,0,0,0.05) 2px, transparent 3px, transparent 6px)",
          mixBlendMode: "overlay",
          zIndex: 5,
        }}
      />

      {/* UPSIDE DOWN RED FOG */}
      <div
        style={{
          position: "absolute",
          top: "-20vh",
          left: "-20vw",
          width: "150vw",
          height: "150vh",
          background:
            "radial-gradient(circle, rgba(255,0,0,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      {/* FLOATING SPORES */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -40, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{
            duration: 4 + i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: "rgba(255,0,0,0.7)",
            filter: "blur(1px)",
            zIndex: 3,
          }}
        />
      ))}

      {/* ============================
              HERO SECTION
      ============================= */}
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "120px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: "95px",
            fontWeight: "900",
            lineHeight: "0.9",
            textTransform: "uppercase",
            color: "#ff0000",
            textShadow:
              "0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.6), 0 0 60px rgba(255,0,0,0.4)",
          }}
        >
          CHRYSALIS 2026
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontSize: "28px",
            letterSpacing: "3px",
            marginTop: "20px",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          National Creative Writing & Media Olympiad
        </motion.h2>

        {/* STRANGER THINGS RED LINE */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            width: "400px",
            height: "3px",
            background: "red",
            marginTop: "25px",
            boxShadow: "0 0 12px red",
          }}
        />

        {/* HERO DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            marginTop: "30px",
            maxWidth: "600px",
            fontSize: "20px",
            opacity: 0.85,
            lineHeight: "1.5",
          }}
        >
          Step into the Upside Down of creativity.  
          A fictional world where writing, fantasy, media, and imagination collide.  
          Face challenges. Break genres. Escape clichés.  
          Only the bold survive.
        </motion.p>

        {/* SUBMIT BUTTON */}
        <motion.a
          href="mailto:ecsa@christuniversity.in"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "40px",
            padding: "16px 40px",
            background: "rgba(255,0,0,0.85)",
            color: "white",
            borderRadius: "8px",
            fontSize: "22px",
            fontWeight: "700",
            letterSpacing: "2px",
            textDecoration: "none",
            boxShadow: "0 0 20px rgba(255,0,0,0.8)",
            textTransform: "uppercase",
          }}
        >
          Submit Your Entry →
        </motion.a>

      </section>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 0",
          opacity: 0.5,
          fontSize: "14px",
        }}
      >
        © ECSA — CHRIST University, Delhi NCR Campus
      </footer>

    </div>
  );
}
