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
{/* HOW TO PARTICIPATE SECTION */}
<div style={{
  marginTop: "150px",
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
    How to Participate
  </h2>

  {/* STEP CONTAINER */}
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "50px"
  }}>

    {/* STEP 1 */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "35px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.25), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.7)",
        boxShadow: "0 0 30px rgba(255,0,0,0.5)",
        position: "relative"
      }}
    >
      <h3 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "10px" }}>Step 1 — Choose Your Category</h3>
      <p style={{ opacity: 0.9 }}>Select from short stories, scripts, filmmaking, blogging, and more.</p>

      {/* MINI SLASH */}
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "-15px",
          right: "20px",
          width: "60px",
          height: "60px",
          background: "linear-gradient(45deg, rgba(255,0,0,0.35), transparent)",
          opacity: 0.4,
          transform: "skewX(-15deg)"
        }}
      />
    </motion.div>

    {/* ARROW */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{
        textAlign: "center",
        fontSize: "40px",
        color: "rgba(255,0,0,0.8)",
        textShadow: "0 0 20px rgba(255,0,0,0.6)"
      }}
    >
      ↓
    </motion.div>

    {/* STEP 2 */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "35px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.25), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.7)",
        boxShadow: "0 0 30px rgba(255,0,0,0.5)",
        position: "relative"
      }}
    >
      <h3 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "10px" }}>Step 2 — Create Your Entry</h3>
      <p style={{ opacity: 0.9 }}>Follow the theme, rules, and file formats. Make it creative and original.</p>

      {/* ENERGY ORB */}
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "-20px",
          width: "70px",
          height: "70px",
          background: "radial-gradient(rgba(255,0,0,0.45), transparent)",
          borderRadius: "50%",
          opacity: 0.35
        }}
      />
    </motion.div>

    {/* ARROW */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{
        textAlign: "center",
        fontSize: "40px",
        color: "rgba(255,0,0,0.8)",
        textShadow: "0 0 20px rgba(255,0,0,0.6)"
      }}
    >
      ↓
    </motion.div>

    {/* STEP 3 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: "35px",
        borderRadius: "18px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.25), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.7)",
        boxShadow: "0 0 30px rgba(255,0,0,0.5)",
        position: "relative"
      }}
    >
      <h3 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "10px" }}>Step 3 — Submit Online</h3>
      <p style={{ opacity: 0.9 }}>Upload your work using the official Google Form link provided.</p>

      {/* FLASH LINE */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "4px",
          background: "linear-gradient(90deg, transparent, rgba(255,0,0,0.7), transparent)"
        }}
      />
    </motion.div>

  </div>

  {/* CTA BUTTON */}
  <motion.a
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    href="#"
    style={{
      display: "inline-block",
      marginTop: "60px",
      padding: "20px 40px",
      fontSize: "22px",
      fontWeight: "900",
      textTransform: "uppercase",
      letterSpacing: "2px",
      background: "linear-gradient(45deg, #ff1a1a, #b30000)",
      borderRadius: "15px",
      boxShadow: "0 0 25px rgba(255,0,0,0.7)",
      color: "white",
      cursor: "pointer"
    }}
  >
    Complete Your Mission →
  </motion.a>

</div>
{/* RULES & GUIDELINES SECTION */}
<div style={{
  marginTop: "150px",
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
    Rules & Guidelines
  </h2>

  {/* SCROLL PANEL */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    style={{
      padding: "50px",
      borderRadius: "25px",
      background: "linear-gradient(180deg, rgba(40,0,0,0.8), rgba(0,0,0,0.85))",
      border: "2px solid rgba(255,0,0,0.6)",
      boxShadow: "0 0 50px rgba(255,0,0,0.6)",
      position: "relative",
      overflow: "hidden"
    }}
  >

    {/* PARCHMENT TEXTURE */}
    <motion.div
      animate={{ opacity: [0.15, 0.3, 0.15] }}
      transition={{ duration: 6, repeat: Infinity }}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('https://i.imgur.com/LJwELRb.png')",
        backgroundSize: "cover",
        opacity: 0.2,
        pointerEvents: "none"
      }}
    />

    {/* CURSED ENERGY SIDE AURAS */}
    <motion.div
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{
        position: "absolute",
        top: 0,
        left: "-10%",
        width: "30%",
        height: "120%",
        background: "radial-gradient(rgba(255,0,0,0.4), transparent)",
        opacity: 0.2
      }}
    />

    <motion.div
      animate={{ scale: [1.15, 1, 1.15] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{
        position: "absolute",
        top: 0,
        right: "-10%",
        width: "30%",
        height: "120%",
        background: "radial-gradient(rgba(255,0,0,0.4), transparent)",
        opacity: 0.2
      }}
    />

    {/* CONTENT */}
    <h3 style={{
      fontSize: "32px",
      fontWeight: "800",
      marginBottom: "25px",
      textShadow: "0 0 10px rgba(255,0,0,0.4)"
    }}>
      General Rules
    </h3>

    <ul style={{ lineHeight: "1.8", fontSize: "18px", opacity: 0.9 }}>
      <li>• All submissions must be original and created exclusively for Chrysalis.</li>
      <li>• Plagiarism leads to immediate disqualification.</li>
      <li>• A participant can submit entries in multiple categories.</li>
      <li>• Follow all file format and word count requirements.</li>
    </ul>

    <div style={{ marginTop: "40px" }} />

    <h3 style={{
      fontSize: "32px",
      fontWeight: "800",
      marginBottom: "25px",
      textShadow: "0 0 10px rgba(255,0,0,0.4)"
    }}>
      Category-Specific Rules
    </h3>

    <ul style={{ lineHeight: "1.8", fontSize: "18px", opacity: 0.9 }}>
      <li>• Short Story — max 1500 words, PDF format.</li>
      <li>• Scriptwriting — up to 10 pages, proper screenplay format.</li>
      <li>• Short Film — max 4 minutes, YouTube/Vimeo link.</li>
      <li>• Blogging — up to 700 words, screenshot + link.</li>
      <li>• Flow Art/Photography — High-resolution JPG/PNG.</li>
    </ul>

    <div style={{ marginTop: "40px" }} />

    {/* ANIME STAMP */}
    <motion.div
      animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
      transition={{ duration: 6, repeat: Infinity }}
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        padding: "20px 30px",
        borderRadius: "12px",
        background: "rgba(255,0,0,0.3)",
        border: "1px solid rgba(255,0,0,0.5)",
        boxShadow: "0 0 25px rgba(255,0,0,0.5)",
        fontSize: "20px",
        fontWeight: "900",
        letterSpacing: "2px",
        textTransform: "uppercase"
      }}
    >
      Official Rules
    </motion.div>

  </motion.div>
</div>
{/* CONTACT HQ SECTION */}
<div style={{
  marginTop: "150px",
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
    Contact HQ
  </h2>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    style={{
      padding: "50px",
      borderRadius: "25px",
      background: "linear-gradient(135deg, rgba(255,0,0,0.2), rgba(0,0,0,0.85))",
      border: "2px solid rgba(255,0,0,0.6)",
      boxShadow: "0 0 50px rgba(255,0,0,0.6)",
      position: "relative",
      overflow: "hidden"
    }}
  >
    {/* LEFT RED ENERGY */}
    <motion.div
      animate={{ opacity: [0.2, 0.45, 0.2] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{
        position: "absolute",
        top: 0,
        left: "-10%",
        width: "40%",
        height: "100%",
        background: "radial-gradient(rgba(255,0,0,0.4), transparent)",
        pointerEvents: "none"
      }}
    />

    {/* RIGHT ENERGY */}
    <motion.div
      animate={{ opacity: [0.45, 0.2, 0.45] }}
      transition={{ duration: 4, repeat: Infinity }}
      style={{
        position: "absolute",
        top: 0,
        right: "-10%",
        width: "40%",
        height: "100%",
        background: "radial-gradient(rgba(255,0,0,0.4), transparent)",
        pointerEvents: "none"
      }}
    />

    {/* CONTACT DETAILS */}
    <h3 style={{
      fontSize: "28px",
      fontWeight: "900",
      marginBottom: "20px",
      textShadow: "0 0 10px rgba(255,0,0,0.5)"
    }}>
      Reach Out to Us
    </h3>

    <p style={{ fontSize: "20px", opacity: 0.9 }}>
      📧 Email: <strong>chrysalis@christuniversity.in</strong>
    </p>
    <p style={{ fontSize: "20px", opacity: 0.9, marginTop: "8px" }}>
      📍 CHRIST (Deemed to be University), Delhi NCR
    </p>

    {/* SOCIAL ICONS */}
    <div style={{
      marginTop: "30px",
      display: "flex",
      gap: "20px"
    }}>
      <motion.div whileHover={{ scale: 1.2 }}>
        <a href="#" style={{ color: "white", fontSize: "30px" }}>◉</a>
      </motion.div>
      <motion.div whileHover={{ scale: 1.2 }}>
        <a href="#" style={{ color: "white", fontSize: "30px" }}>▲</a>
      </motion.div>
      <motion.div whileHover={{ scale: 1.2 }}>
        <a href="#" style={{ color: "white", fontSize: "30px" }}>◆</a>
      </motion.div>
    </div>
  </motion.div>
</div>

{/* FOOTER — ANIME TERMINAL */}
<div style={{
  marginTop: "120px",
  padding: "40px 20px",
  textAlign: "center",
  background: "rgba(0,0,0,0.9)",
  borderTop: "2px solid rgba(255,0,0,0.5)",
  boxShadow: "0 -15px 40px rgba(255,0,0,0.4)",
  position: "relative"
}}>

  {/* FLICKER BAR */}
  <motion.div
    animate={{ opacity: [0.2, 0.8, 0.2] }}
    transition={{ duration: 2, repeat: Infinity }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: "4px",
      width: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255,0,0,0.8), transparent)"
    }}
  />

  <p style={{ fontSize: "18px", opacity: 0.8, marginTop: "20px" }}>
    © 2026 Chrysalis • Department of English & Cultural Studies  
  </p>

  <p style={{
    fontSize: "15px",
    opacity: 0.6,
    marginTop: "5px",
    letterSpacing: "1px",
    fontFamily: "monospace"
  }}>
    [ SYSTEM STATUS : ONLINE ]  
  </p>

  {/* TERMINAL BLINKING DOT */}
  <motion.span
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1, repeat: Infinity }}
    style={{
      fontSize: "22px",
      color: "rgba(255,0,0,0.8)"
    }}
  >
    ●
  </motion.span>
</div>

    </div>
  );
}
