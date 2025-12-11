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
{/* CATEGORY SECTION */}
<div style={{
  marginTop: "80px",
  padding: "40px",
  position: "relative",
  zIndex: 10
}}>

  <h2 style={{
    fontSize: "48px",
    fontWeight: "900",
    marginBottom: "40px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    textShadow: "0 0 15px rgba(255,0,0,0.5)"
  }}>
    Categories
  </h2>

  <div style={{
    display: "grid",
    gap: "30px",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
  }}>

    {[
      "Short Story",
      "Poetry",
      "Scriptwriting",
      "Songwriting",
      "Storyboards"
    ].map(category => (
      <motion.div
        key={category}
        whileHover={{ scale: 1.08, rotate: -2 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          padding: "30px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,0,0,0.35)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 0 25px rgba(255,0,0,0.4)",
          cursor: "pointer",
          transform: "skewX(-3deg)",
        }}
      >
        <h3 style={{
          fontSize: "28px",
          fontWeight: "800",
          marginBottom: "10px",
          textShadow: "0 0 10px rgba(255,0,0,0.4)"
        }}>
          {category}
        </h3>
        <p style={{
          opacity: 0.8,
          fontSize: "16px",
          lineHeight: "1.4"
        }}>
          Unleash your creativity in the {category} arena.
        </p>
      </motion.div>
    ))}

  </div>

</div>
{/* WHY PARTICIPATE SECTION */}
<div style={{
  marginTop: "100px",
  padding: "40px",
  position: "relative",
  zIndex: 10
}}>

  <h2 style={{
    fontSize: "48px",
    fontWeight: "900",
    marginBottom: "40px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    textShadow: "0 0 15px rgba(255,0,0,0.5)"
  }}>
    Why Participate?
  </h2>

  <div style={{
    display: "grid",
    gap: "30px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
  }}>

    {/* PANEL 1 */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "35px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.3), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.6)",
        backdropFilter: "blur(15px)",
        boxShadow: "0 0 35px rgba(255,0,0,0.5)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "100%",
          background: "linear-gradient(45deg, rgba(255,0,0,0.3), transparent 60%)",
          opacity: 0.2,
          transform: "skewX(-20deg)"
        }}
      />
      <h3 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "10px" }}>National Stage</h3>
      <p style={{ opacity: 0.85 }}>Compete on a national platform and get your work seen by top evaluators and creators.</p>
    </motion.div>

    {/* PANEL 2 */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "35px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.3), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.6)",
        backdropFilter: "blur(15px)",
        boxShadow: "0 0 35px rgba(255,0,0,0.5)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <motion.div
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "100%",
          background: "linear-gradient(45deg, transparent 40%, rgba(255,0,0,0.3))",
          opacity: 0.2,
          transform: "skewX(-20deg)"
        }}
      />
      <h3 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "10px" }}>Epic Recognition</h3>
      <p style={{ opacity: 0.85 }}>Winners receive certificates, awards, and a spotlight across our platforms.</p>
    </motion.div>

    {/* PANEL 3 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        padding: "35px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.3), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.6)",
        backdropFilter: "blur(15px)",
        boxShadow: "0 0 35px rgba(255,0,0,0.5)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <motion.div
        animate={{ rotate: [0, 20, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "-20%",
          right: "-20%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(rgba(255,0,0,0.4), transparent)",
          opacity: 0.3
        }}
      />
      <h3 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "10px" }}>Skill Boost</h3>
      <p style={{ opacity: 0.85 }}>Grow your creative storytelling abilities with a challenge that pushes your limits.</p>
    </motion.div>

  </div>

</div>
{/* EVENT DETAILS SECTION */}
<div style={{
  marginTop: "120px",
  padding: "40px",
  position: "relative",
  zIndex: 10
}}>

  {/* HEADER */}
  <h2 style={{
    fontSize: "48px",
    fontWeight: "900",
    marginBottom: "40px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    textShadow: "0 0 15px rgba(255,0,0,0.5)"
  }}>
    Event Details
  </h2>

  {/* MAIN GRID */}
  <div style={{
    display: "grid",
    gap: "40px",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))"
  }}>

    {/* DATE CARD */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "45px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.35), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.7)",
        boxShadow: "0 0 35px rgba(255,0,0,0.5)",
        backdropFilter: "blur(16px)",
        position: "relative"
      }}
    >
      <h3 style={{ fontSize: "30px", fontWeight: "900", marginBottom: "10px" }}>
        Event Day
      </h3>
      <p style={{ fontSize: "20px", opacity: 0.9 }}>15 March, 2026</p>
      <p style={{ opacity: 0.7, marginTop: "5px" }}>Online Showcase + Awards</p>

      {/* SLASH DECORATION */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          width: "80px",
          height: "80px",
          background: "linear-gradient(45deg, rgba(255,0,0,0.4), transparent)",
          transform: "skewX(-20deg)",
          opacity: 0.35
        }}
      />
    </motion.div>

    {/* DEADLINE CARD */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      style={{
        padding: "45px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.35), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.7)",
        boxShadow: "0 0 35px rgba(255,0,0,0.5)",
        backdropFilter: "blur(16px)",
        position: "relative"
      }}
    >
      <h3 style={{ fontSize: "30px", fontWeight: "900", marginBottom: "10px" }}>
        Submission Deadline
      </h3>
      <p style={{ fontSize: "20px", opacity: 0.9 }}>27 February, 2026</p>
      <p style={{ opacity: 0.7, marginTop: "5px" }}>All entries online</p>

      {/* GLOW ORB */}
      <motion.div
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "-25px",
          left: "-25px",
          width: "80px",
          height: "80px",
          background: "radial-gradient(rgba(255,0,0,0.4), transparent)",
          borderRadius: "50%",
          opacity: 0.3
        }}
      />
    </motion.div>

    {/* PRIZE POOL */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      style={{
        padding: "45px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.35), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.7)",
        boxShadow: "0 0 35px rgba(255,0,0,0.5)",
        backdropFilter: "blur(16px)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <h3 style={{ fontSize: "30px", fontWeight: "900", marginBottom: "10px" }}>
        Prize Pool
      </h3>
      <p style={{ fontSize: "20px", opacity: 0.9 }}>₹50,000 Total</p>

      <ul style={{ marginTop: "10px", opacity: 0.85, lineHeight: "1.6" }}>
        <li>• Short Story — ₹6,000</li>
        <li>• Scriptwriting — ₹10,000</li>
        <li>• Short Film — ₹16,000</li>
        <li>• Other categories — Awards & Mentions</li>
      </ul>

      {/* ENERGY WAVE */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          width: "140px",
          height: "140px",
          background: "radial-gradient(rgba(255,0,0,0.5), transparent)",
          opacity: 0.28
        }}
      />
    </motion.div>

  </div>

</div>

    </div>
  );
}
