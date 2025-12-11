import { motion } from "framer-motion";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #430000, #7a0000)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* BACKGROUND STRIPES */}
      <div
        style={{
          position: "absolute",
          top: "-20vh",
          left: "-10vw",
          width: "150vw",
          height: "150vh",
          background: "linear-gradient(45deg, rgba(255,0,0,0.15), transparent)",
          transform: "rotate(-15deg)",
          zIndex: 0,
        }}
      />

      {/* ANIME SHADOW — moved further right so it does NOT cover content */}
      <motion.img
        src="https://i.ibb.co/6Y6Q5fM/anime-silhouette-shadow.png"
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 0.22, x: 0 }}
        transition={{ duration: 1.4 }}
        style={{
          position: "absolute",
          right: "-260px", // SHIFTED RIGHT = no more half-page look
          bottom: 0,
          height: "100vh",
          objectFit: "contain",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* FLOATING PARTICLES */}
      {[...Array(18)].map((_, i) => (
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
            top: `${10 + i * 3}%`,
            left: `${5 + i * 4}%`,
            zIndex: 2,
          }}
        />
      ))}

      {/* MAIN CONTENT WRAPPER — FULL WIDTH */}
      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 10 }}>

        {/* ---------------- HERO SECTION ---------------- */}
        <div style={{ padding: "150px 0 140px 0" }}>
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: "90px",
              fontWeight: "900",
              letterSpacing: "4px",
              textAlign: "left",
              textShadow: "0 0 25px rgba(255,0,0,0.5)",
              lineHeight: "1.05",
            }}
          >
            CHRYSALIS 2026
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1 }}
            style={{
              fontSize: "26px",
              maxWidth: "600px",
              marginTop: "25px",
              opacity: 0.85,
              lineHeight: "1.4",
            }}
          >
            National Creative Writing & Media Olympiad  
            <br />
            A battle of imagination. A clash of art. A festival of stories.
          </motion.p>

          <motion.a
            href="mailto:ecsa@christuniversity.in"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: "inline-block",
              marginTop: "45px",
              padding: "18px 45px",
              background: "#ff2a2a",
              borderRadius: "10px",
              fontSize: "24px",
              fontWeight: "800",
              color: "white",
              textDecoration: "none",
              textTransform: "uppercase",
              boxShadow: "0 0 18px rgba(255,0,0,0.6)",
            }}
          >
            Submission Portal →
          </motion.a>
        </div>

        {/* ---------------- CATEGORY SECTION ---------------- */}
        <div style={{ marginTop: "60px" }}>
          <SectionTitle title="Categories" />

          <div style={{
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
          }}>
            {["Short Story", "Poetry", "Scriptwriting", "Songwriting", "Storyboards"].map(text => (
              <CategoryCard key={text} title={text} />
            ))}
          </div>
        </div>

        {/* ---------------- WHY PARTICIPATE SECTION ---------------- */}
        <div style={{ marginTop: "120px" }}>
          <SectionTitle title="Why Participate?" />

          <div style={{
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
          }}>
            <WhyCard title="National Stage" text="Compete on a national platform..." />
            <WhyCard title="Epic Recognition" text="Certificates, awards, and spotlight..." />
            <WhyCard title="Skill Boost" text="Grow your storytelling craft..." />
          </div>
        </div>

        {/* ---------------- EVENT DETAILS ---------------- */}
        <div style={{ marginTop: "150px" }}>
          <SectionTitle title="Event Details" />

          <div style={{
            display: "grid",
            gap: "40px",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))"
          }}>
            <DetailCard title="Event Day" text1="15 March, 2026" text2="Online Showcase + Awards" />
            <DetailCard title="Submission Deadline" text1="27 February, 2026" text2="All entries online" />
            <DetailCard title="Prize Pool" text1="₹50,000 Total" text2="Category-wise awards" />
          </div>
        </div>

        {/* ---------------- HOW TO PARTICIPATE ---------------- */}
        <div style={{ marginTop: "150px" }}>
          <SectionTitle title="How to Participate" />

          <StepsSection />
        </div>

        {/* ---------------- RULES & GUIDELINES ---------------- */}
        <div style={{ marginTop: "150px" }}>
          <SectionTitle title="Rules & Guidelines" />
          <RulesSection />
        </div>

        {/* ---------------- CONTACT HQ ---------------- */}
        <div style={{ marginTop: "140px" }}>
          <SectionTitle title="Contact HQ" />
          <ContactSection />
        </div>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SectionTitle({ title }) {
  return (
    <h2 style={{
      fontSize: "50px",
      fontWeight: "900",
      letterSpacing: "3px",
      marginBottom: "40px",
      textShadow: "0 0 15px rgba(255,0,0,0.5)",
      textTransform: "uppercase",
    }}>
      {title}
    </h2>
  );
}

function CategoryCard({ title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, rotate: -1 }}
      transition={{ type: "spring", stiffness: 220 }}
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
      <h3 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "10px" }}>{title}</h3>
      <p style={{ opacity: 0.8 }}>Unleash your creativity in the {title} arena.</p>
    </motion.div>
  );
}

function WhyCard({ title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      style={{
        padding: "35px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,0,0,0.3), rgba(0,0,0,0.6))",
        border: "1px solid rgba(255,0,0,0.6)",
        backdropFilter: "blur(15px)",
        boxShadow: "0 0 35px rgba(255,0,0,0.5)",
      }}
    >
      <h3 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "12px" }}>{title}</h3>
      <p style={{ opacity: 0.85 }}>{text}</p>
    </motion.div>
  );
}

function DetailCard({ title, text1, text2 }) {
  return (
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
      }}
    >
      <h3 style={{ fontSize: "30px", fontWeight: "900", marginBottom: "10px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "20px", opacity: 0.9 }}>{text1}</p>
      <p style={{ opacity: 0.7, marginTop: "5px" }}>{text2}</p>
    </motion.div>
  );
}

function StepsSection() {
  return (
    <>
      {[
        ["Step 1 — Choose Your Category", "Select from short stories, scripts, filmmaking, blogging, and more."],
        ["Step 2 — Create Your Entry", "Follow the theme, rules, and formats. Make it original."],
        ["Step 3 — Submit Online", "Use the official portal: ecsa@christuniversity.in"],
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            padding: "35px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, rgba(255,0,0,0.25), rgba(0,0,0,0.6))",
            border: "1px solid rgba(255,0,0,0.7)",
            boxShadow: "0 0 30px rgba(255,0,0,0.5)",
            marginBottom: "40px",
          }}
        >
          <h3 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "10px" }}>
            {step[0]}
          </h3>
          <p style={{ opacity: 0.9 }}>{step[1]}</p>
        </motion.div>
      ))}
    </>
  );
}

function RulesSection() {
  return (
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
        overflow: "hidden",
      }}
    >
      <h3 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "20px" }}>
        General Rules
      </h3>
      <ul style={{ lineHeight: "1.8", fontSize: "18px", opacity: 0.9 }}>
        <li>• All submissions must be original.</li>
        <li>• Plagiarism leads to instant disqualification.</li>
        <li>• Multiple categories allowed.</li>
        <li>• Follow file formats strictly.</li>
      </ul>

      <div style={{ marginTop: "40px" }} />

      <h3 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "20px" }}>
        Category-Specific Rules
      </h3>
      <ul style={{ lineHeight: "1.8", fontSize: "18px", opacity: 0.9 }}>
        <li>• Short Story — max 1500 words, PDF.</li>
        <li>• Scriptwriting — proper screenplay format.</li>
        <li>• Short Film — max 4 minutes.</li>
        <li>• Blogging — up to 700 words.</li>
        <li>• Photography/Art — JPG/PNG HD.</li>
      </ul>
    </motion.div>
  );
}

function ContactSection() {
  return (
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
      }}
    >
      <h3 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "20px" }}>
        Reach Out to Us
      </h3>

      <p style={{ fontSize: "20px", opacity: 0.9 }}>
        📧 Email: <strong>ecsa@christuniversity.in</strong>
      </p>

      <p style={{ fontSize: "20px", opacity: 0.9, marginTop: "10px" }}>
        📍 CHRIST (Deemed to be University), Delhi NCR
      </p>
    </motion.div>
  );
}

function Footer() {
  return (
    <div
      style={{
        marginTop: "120px",
        padding: "40px 20px",
        textAlign: "center",
        background: "rgba(0,0,0,0.9)",
        borderTop: "2px solid rgba(255,0,0,0.5)",
        boxShadow: "0 -15px 40px rgba(255,0,0,0.4)",
      }}
    >
      <p style={{ fontSize: "18px", opacity: 0.8 }}>
        © 2026 Chrysalis • Department of English & Cultural Studies
      </p>
      <p
        style={{
          fontSize: "15px",
          opacity: 0.6,
          marginTop: "5px",
          letterSpacing: "1px",
          fontFamily: "monospace",
        }}
      >
        [ SYSTEM STATUS : ONLINE ]
      </p>
    </div>
  );
}
