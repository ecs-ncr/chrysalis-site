import { motion } from "framer-motion";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #000000, #430000, #7a0000)",
      color: "white",
      fontFamily: "Inter, sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* SHONEN ANGLED STRIPES */}
      <div style={{
        position: "absolute",
        top: "-20vh",
        left: "-10vw",
        width: "150vw",
        height: "150vh",
        background: "linear-gradient(45deg, rgba(255,0,0,0.15), transparent)",
        transform: "rotate(-15deg)",
        zIndex: 0,
      }} />

      {/* ANIME SILHOUETTE RIGHT SIDE */}
      <motion.img
        src="https://i.ibb.co/6Y6Q5fM/anime-silhouette-shadow.png" // replace later with your own
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.25, x: 0 }}
        transition={{ duration: 1.3 }}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: "90vh",
          opacity: 0.25,
          objectFit: "contain",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* FLOATING PARTICLES */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3 + i * 0.1, repeat: Infinity }}
          style={{
            width: "6px",
            height: "6px",
            background: "white",
            borderRadius: "50%",
            position: "absolute",
            top: `${20 + i * 3}%`,
            left: `${10 + i * 4}%`,
            zIndex: 2,
          }}
        />
      ))}

      {/* HERO CONTENT */}
      <div style={{
        position: "relative",
        zIndex: 10,
        padding: "80px 50px",
        maxWidth: "900px",
      }}>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            fontSize: "78px",
            fontWeight: "900",
            letterSpacing: "4px",
            lineHeight: "1",
            textShadow: "0 0 20px rgba(255,0,0,0.4)",
          }}
        >
          CHRYSALIS 2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            fontSize: "24px",
            marginTop: "20px",
            maxWidth: "600px",
            opacity: 0.8,
          }}
        >
          National Creative Writing & Media Olympiad  
          <br />
          A battle of imagination. A clash of art. A festival of stories.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          style={{
            marginTop: "40px",
            padding: "16px 40px",
            fontSize: "22px",
            fontWeight: "700",
            background: "#ff2a2a",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
            boxShadow: "0 0 15px rgba(255,0,0,0.6)",
          }}
        >
          Join the Competition
        </motion.button>

      </div>

    </div>
  );
}
