// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Final — Glassmorphic Card Layout / Academic Brochure
 * - Full-screen video background (public/videos/mindflayer.mp4)
 * - Translucent overlay, glass cards (backdrop-filter blur)
 * - No external imgbb assets, no jumpscare
 * - Click "Enable sound" to unmute the video (autoplay stays muted by default)
 *
 * Copy this file over src/App.jsx and ensure:
 * - public/videos/mindflayer.mp4 exists and is committed
 * - framer-motion is installed (npm i framer-motion)
 */

export default function App() {
  const videoRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [started, setStarted] = useState(false);

  // Ensure body/html don't horizontally overflow
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  // Auto-play video immediately (muted) on mount
useEffect(() => {
  if (!videoRef.current) return;
  videoRef.current.muted = true;
  videoRef.current.volume = 0;
  videoRef.current.play().catch(() => {});
}, []);

// Only toggle sound — DO NOT control play() here
const handleEnableSound = () => {
  if (!videoRef.current) return;

  setSoundOn((s) => {
    const next = !s;
    videoRef.current.muted = !next;
    videoRef.current.volume = next ? 0.25 : 0;
    return next;
  });
};

  // Toggle sound but respect browser autoplay policies — user interaction required
  const handleEnableSound = () => {
    setSoundOn((s) => {
      const next = !s;
      try {
        if (videoRef.current) {
          videoRef.current.muted = !next;
          videoRef.current.volume = next ? 0.25 : 0;
        }
      } catch (_) {}
      // mark started when user interacts
      setStarted(true);
      return next;
    });
  };

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Content text (academic, polished)
  const aboutChrysalis = `Chrysalis 2026 is the national-level Creative Writing and Media Olympiad organized by the Department of English and Cultural Studies, CHRIST (Deemed to be University), Delhi NCR. The Olympiad offers a structured forum for young writers and media practitioners to present original work, refine craft, and engage with peer and faculty evaluators.`;
  const aboutDepartment = `The Department of English and Cultural Studies fosters interdisciplinary inquiry across literature, cultural theory, media studies and creative practice. Our faculty combine scholarly research and pedagogical innovation to equip students with analytical rigor, strong communication skills and a commitment to social and cultural engagement.`;
  const aboutUniversity = `CHRIST (Deemed to be University) is a multidisciplinary institution committed to holistic education, research and societal engagement. The Delhi NCR campus emphasizes experiential learning, scholarly excellence and the cultivation of ethical leadership.`;

  const categories = [
    {
      title: "Poetry",
      desc: "Original poetic compositions demonstrating imagery, craft, and clarity of expression.",
    },
    {
      title: "Songwriting",
      desc: "Lyric-driven entries that reflect thematic coherence and lyrical sensitivity. (Audio or lyric file acceptable as specified.)",
    },
    {
      title: "Short Story",
      desc: "Short fiction exhibiting narrative structure, characterization and thematic depth.",
    },
    {
      title: "Scriptwriting",
      desc: "Screen- or stage-oriented scripts with clear scene construction, dialogue and dramatic direction.",
    },
    {
      title: "Short Film",
      desc: "Concise original film (visual storytelling, editing, sound design and narrative cohesion are evaluated).",
    },
  ];

  // styling helpers
  const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 22,
    backdropFilter: "blur(10px) saturate(120%)",
    boxShadow: "0 6px 30px rgba(0,0,0,0.45)",
    color: "#fff",
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial", color: "#fff", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      {/* FULLSCREEN VIDEO BACKGROUND (centered, cover) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: -20,
        }}
        aria-hidden
      >
        <video
          ref={videoRef}
          src="/videos/mindflayer.mp4"
          autoPlay
          loop
          playsInline
          muted={!soundOn}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>

      {/* TRANSLUCENT OVERLAY (light) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.28))",
          zIndex: -10,
        }}
        aria-hidden
      />

      {/* NAVBAR */}
      <header style={{ position: "fixed", top: 12, left: 0, right: 0, zIndex: 40, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontFamily: "Cinzel, serif", color: "#ffdede", fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>CHRYSALIS</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>2026 • Creative Writing & Media Olympiad</div>
        </div>

        <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <button onClick={() => goTo("about")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>About</button>
          <button onClick={() => goTo("categories")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>Categories</button>
          <button onClick={() => goTo("prizes")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>Prizes</button>
          <button onClick={() => goTo("rules")} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>Rules</button>
          <button onClick={() => goTo("submit")} style={{ background: "#ff5959", border: "none", color: "#fff", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>Submit</button>
        </nav>
      </header>

      {/* CONTROL BAR (Enable sound + small info) */}
      <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 40 }}>
        <div style={{ ...cardStyle, padding: 10, display: "flex", gap: 10, alignItems: "center", minWidth: 180 }}>
          <button
            onClick={handleEnableSound}
            style={{
              background: soundOn ? "#e85a5a" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
              padding: "8px 10px",
              borderRadius: 8,
              cursor: "pointer",
            }}
            aria-pressed={soundOn}
          >
            {soundOn ? "Sound On" : "Enable sound"}
          </button>
          <div style={{ fontSize: 12, opacity: 0.9 }}>
            <div style={{ fontWeight: 700 }}>Chrysalis 2026</div>
            <div style={{ opacity: 0.8 }}>Deadline: 27 Feb 2026</div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT — cards stacked within central column */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "120px 20px 80px" }}>
        {/* Hero Card */}
        <motion.section initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ ...cardStyle, marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontFamily: "Cinzel, serif", fontSize: "clamp(28px, 4vw, 44px)", color: "#ffdede" }}>CHRYSALIS 2026</h1>
          <p style={{ marginTop: 10, color: "#fff", opacity: 0.9 }}>
            National Creative Writing and Media Olympiad — a scholarly platform for young writers and media creators to present original work, receive evaluation, and engage in constructive academic exchange.
          </p>
        </motion.section>

        {/* About / Dept / University Cards — grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          <motion.article initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} style={cardStyle} id="about">
            <h2 style={{ marginTop: 0, color: "#ffdede" }}>About Chrysalis</h2>
            <p style={{ color: "#fff", opacity: 0.95 }}>{aboutChrysalis}</p>
          </motion.article>

          <motion.article initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }} style={cardStyle}>
            <h2 style={{ marginTop: 0, color: "#ffdede" }}>Department of English & Cultural Studies</h2>
            <p style={{ color: "#fff", opacity: 0.95 }}>{aboutDepartment}</p>
          </motion.article>

          <motion.article initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18 }} style={cardStyle}>
            <h2 style={{ marginTop: 0, color: "#ffdede" }}>CHRIST (Deemed to be University)</h2>
            <p style={{ color: "#fff", opacity: 0.95 }}>{aboutUniversity}</p>
          </motion.article>
        </div>

        {/* Categories card (detailed list) */}
        <motion.section id="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ ...cardStyle, marginTop: 24 }}>
          <h2 style={{ color: "#ffdede" }}>Categories</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {categories.map((c) => (
              <div key={c.title} style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
                <div style={{ fontWeight: 700, color: "#fff" }}>{c.title}</div>
                <div style={{ fontSize: 14, opacity: 0.9 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Prize Pool & Rules side-by-side on wide screens */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 24 }}>
          <motion.section id="prizes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={cardStyle}>
            <h2 style={{ color: "#ffdede" }}>Prize Pool</h2>
            <ul>
              <li>Poetry — ₹3,000</li>
              <li>Songwriting — ₹5,000</li>
              <li>Short Story — ₹6,000</li>
              <li>Scriptwriting — ₹10,000</li>
              <li>Short Film — ₹16,000</li>
            </ul>
            <p style={{ marginTop: 8 }}>Total distributed: ₹45,000. Certificates and citations awarded to finalists and notable mentions.</p>
          </motion.section>

          <motion.section id="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={cardStyle}>
            <h2 style={{ color: "#ffdede" }}>Rules & Regulations</h2>
            <ol style={{ paddingLeft: 18 }}>
              <li>Participation is open to school students (Classes 9–12).</li>
              <li>Submissions must be original and unpublished.</li>
              <li>Plagiarism leads to immediate disqualification.</li>
              <li>Participants may enter multiple categories (submit separate entries).</li>
              <li>Follow file-format and length specifications for each category.</li>
              <li>Include full name, school, grade and category in your submission email.</li>
              <li>Judges’ decisions are final and binding.</li>
              <li>CHRIST reserves rights to publish winning work with due credit.</li>
            </ol>
          </motion.section>
        </div>

        {/* Submission & Contact */}
        <motion.section id="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ ...cardStyle, marginTop: 24 }}>
          <h2 style={{ color: "#ffdede" }}>Submission Details</h2>
          <p>
            Email your submission to:
            <br />
            <a href="mailto:ecs.ncr@christuniversity.in" style={{ color: "#ffdede", textDecoration: "underline" }}>ecs.ncr@christuniversity.in</a>
          </p>
          <p style={{ marginTop: 6 }}>Attach your file (PDF/MP4/MP3 as relevant) and include name, school, grade/class and category in the body of the email.</p>
          <p style={{ fontWeight: 700, marginTop: 8 }}>Submission deadline: 27 February 2026</p>
        </motion.section>

        <motion.section id="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ ...cardStyle, marginTop: 20 }}>
          <h2 style={{ color: "#ffdede" }}>Contact</h2>
          <p>For academic queries and clarifications, write to <strong>ecs.ncr@christuniversity.in</strong>.</p>
        </motion.section>

        {/* Footer */}
        <footer style={{ marginTop: 22, textAlign: "center", color: "#ffdede", opacity: 0.9 }}>
          <div>© 2026 Chrysalis — Department of English & Cultural Studies</div>
          <div style={{ marginTop: 6 }}>Designed & maintained by <strong>Siddharth Dubey</strong></div>
        </footer>
      </main>
    </div>
  );
}
