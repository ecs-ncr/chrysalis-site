// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  FINAL — Style A (Cinematic Dark Red) + Audio A (Intro + Ambient + Static)
  Mind Flayer Style 2 (High-detail)
  Hosted audio URLs (no local /public/sounds needed)
*/

export default function App() {
  // Page title
  useEffect(() => {
    document.title = "CHRYSALIS 2026 – National Creative Writing Olympiad";
  }, []);

  // Audio refs
  const ambientRef = useRef(null);
  const staticRef = useRef(null);
  const rumbleRef = useRef(null);
  const growlRef = useRef(null);
  const introRef = useRef(null);

  // state
  const [showIntro, setShowIntro] = useState(true);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [footsteps, setFootsteps] = useState([]);
  const [showJumpscare, setShowJumpscare] = useState(false);
  const lastScroll = useRef({ time: Date.now(), y: 0 });
  const scrollCooldown = useRef(false);

  // hosted audio URLs (Pixabay free SFX)
  const AMBIENT =
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_3e7bbf35d8.mp3?filename=dark-ambient-drone-110152.mp3";
  const STATIC_SFX =
    "https://cdn.pixabay.com/download/audio/2021/09/27/audio_572cb15c2a.mp3?filename=vhs-static-94416.mp3";
  const RUMBLE =
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8799c67bb5.mp3?filename=deep-impact-rumble-110144.mp3";
  const GROWL =
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_74335ce0a6.mp3?filename=monster-growl-108750.mp3";
  const INTRO =
    "https://cdn.pixabay.com/download/audio/2021/09/07/audio_af917ddfb1.mp3?filename=cinematic-hit-90786.mp3";

  // images (hosted)
  const MIND_FLAYER =
    "https://i.ibb.co/6y9rZr0/mindflayer-hd.png" /* high-detail placeholder — replace with your preferred file */;
  const DEMOGORGON_JUMP = "https://i.ibb.co/9g1mZ6m/demogorgon-jump.png";
  const RED_FOG = "https://i.ibb.co/K6Z2kTL/redfog.png";
  const STATIC_GIF = "https://i.ibb.co/0jVhYjH/static.gif";
  const UPSIDE_DOWN_BG = "https://i.ibb.co/GV9rtmp/upside-down-red.jpg";

  // try to unlock audio on first user interaction
  useEffect(() => {
    const unlock = () => {
      // try play ambient + static (some browsers require user gesture)
      try {
        ambientRef.current?.play();
        staticRef.current?.play();
        introRef.current?.play();
      } catch (e) {
        // ignored
      }
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  // play intro and end it after 6.2s
  useEffect(() => {
    if (introRef.current) {
      introRef.current.volume = 0.95;
      introRef.current.play().catch(() => {});
    }
    const t = setTimeout(() => {
      setShowIntro(false);
      // start ambient/static if available
      try {
        ambientRef.current.volume = 0.12;
        ambientRef.current.loop = true;
        ambientRef.current.play().catch(() => {});
        staticRef.current.volume = 0.05;
        staticRef.current.play().catch(() => {});
      } catch (e) {}
    }, 6200);
    return () => clearTimeout(t);
  }, []);

  // cursor follow
  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // footstep + rumble on click
  useEffect(() => {
    const onClick = (e) => {
      // rumble
      if (rumbleRef.current) {
        rumbleRef.current.currentTime = 0;
        rumbleRef.current.volume = 0.6;
        rumbleRef.current.play().catch(() => {});
      }
      const id = Date.now();
      setFootsteps((fs) => [...fs, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setFootsteps((fs) => fs.filter((f) => f.id !== id));
      }, 900);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  // jumpscare on fast scroll detection
  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastScroll.current.time);
      const dy = Math.abs(y - lastScroll.current.y);
      const speed = dy / dt; // px per ms
      lastScroll.current = { time: now, y };
      if (!scrollCooldown.current && speed > 0.9) {
        scrollCooldown.current = true;
        setShowJumpscare(true);
        // sounds for jumpscare
        try {
          if (growlRef.current) {
            growlRef.current.currentTime = 0;
            growlRef.current.volume = 0.9;
            growlRef.current.play().catch(() => {});
          }
          if (staticRef.current) {
            staticRef.current.currentTime = 0;
            staticRef.current.play().catch(() => {});
          }
        } catch (e) {}
        setTimeout(() => setShowJumpscare(false), 900);
        setTimeout(() => (scrollCooldown.current = false), 6000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // small helper: smooth scroll to element
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // styles for outer container (use width:100% to avoid 100vw scrollbar issue)
  const outerStyle = {
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    background: "#050405",
    color: "#fff",
    position: "relative",
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  return (
    <div style={outerStyle}>
      {/* AUDIO (hosted) */}
      <audio ref={ambientRef} src={AMBIENT} loop preload="auto" />
      <audio ref={staticRef} src={STATIC_SFX} preload="auto" />
      <audio ref={rumbleRef} src={RUMBLE} preload="auto" />
      <audio ref={growlRef} src={GROWL} preload="auto" />
      <audio ref={introRef} src={INTRO} preload="auto" />

      {/* INTRO cinematic overlay */}
      {showIntro && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at 50% 40%, rgba(25,0,0,1), rgba(0,0,0,1))",
          }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <motion.h1
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: "'Cinzel', serif",
                color: "#ff2a2a",
                fontSize: 72,
                letterSpacing: 6,
                textAlign: "center",
                textShadow: "0 0 28px rgba(255,0,0,0.8)",
                margin: 0,
              }}
            >
              CHRYSALIS
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} style={{ color: "#ff8a8a", textAlign: "center", marginTop: 12 }}>
              National Creative Writing & Media Olympiad
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 260, height: 6, background: "linear-gradient(90deg,#ff1a1a,#6b0000)", borderRadius: 6, boxShadow: "0 0 20px rgba(255,0,0,0.35)" }} />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* BACKGROUND LAYERS */}
      {/* Fullscreen Upside-down background image (subtle, behind fog) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${UPSIDE_DOWN_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
          filter: "contrast(0.8) saturate(0.7)",
          pointerEvents: "none",
        }}
      />

      {/* red cinematic fog (parallax subtle) */}
      <motion.div
        style={{
          position: "fixed",
          top: -100,
          left: -100,
          width: "140%",
          height: "140%",
          zIndex: 1,
          pointerEvents: "none",
          mixBlendMode: "screen",
          filter: "blur(18px)",
        }}
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      >
        <img src={RED_FOG} alt="fog" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
      </motion.div>

      {/* Mind Flayer HD - right side */}
      <motion.img
        src={MIND_FLAYER}
        alt="Mind Flayer"
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ duration: 2.2 }}
        style={{
          position: "fixed",
          right: "0%",
          top: "3vh",
          height: "92vh",
          zIndex: 2,
          opacity: 0.16,
          pointerEvents: "none",
          objectFit: "contain",
        }}
      />

      {/* CRT static overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none", mixBlendMode: "screen", opacity: 0.03 }}>
        <img src={STATIC_GIF} alt="static" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* CUSTOM BLOOD-DRIP CURSOR */}
      <div
        style={{
          position: "fixed",
          left: cursor.x,
          top: cursor.y,
          transform: "translate(-50%, -50%)",
          zIndex: 9998,
          pointerEvents: "none",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 8, background: "#ff2a2a", boxShadow: "0 0 8px rgba(255,0,0,0.9)" }} />
        <div style={{ position: "absolute", left: 3, top: 13, width: 6, height: 18, borderRadius: "0 0 6px 6px", background: "linear-gradient(#b30000,#660000)" }} />
      </div>

      {/* FOOTSTEP TRAIL */}
      {footsteps.map((f) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 1, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.9 }}
          style={{
            position: "fixed",
            left: f.x - 10,
            top: f.y - 10,
            width: 20,
            height: 20,
            borderRadius: 6,
            background: "rgba(255,30,30,0.85)",
            zIndex: 9997,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 28px",
          background: "rgba(0,0,0,0.45)",
          borderBottom: "1px solid rgba(255,0,0,0.12)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontFamily: "'Cinzel', serif", color: "#ff2a2a", fontWeight: 800, fontSize: 20, cursor: "pointer", textShadow: "0 0 6px rgba(255,0,0,0.6)" }}>
          CHRYSALIS
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          {[
            ["About", "about"],
            ["Categories", "categories"],
            ["Prizes", "prizes"],
            ["Rules", "rules"],
            ["Submit", "submit"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <div key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer", color: "#fff", opacity: 0.95 }}>
              {label}
            </div>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main
        style={{
          position: "relative",
          zIndex: 6,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "110px 20px 60px",
        }}
      >
        {/* HERO */}
        <section id="home" style={{ minHeight: "78vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
          <motion.h1 initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ fontFamily: "'Cinzel', serif", color: "#ff2a2a", fontSize: "clamp(36px, 7vw, 72px)", letterSpacing: 4, margin: 0, textShadow: "0 0 20px rgba(255,0,0,0.6)" }}>
            CHRYSALIS 2026
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} transition={{ delay: 0.3 }} style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#ffd6d6", maxWidth: 820 }}>
            National Creative Writing & Media Olympiad — a festival of narrative, media, and imagination. Enter the Upside Down of storytelling.
          </motion.p>
          <div style={{ marginTop: 18 }}>
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "12px 22px", background: "#ff1a1a", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>
              Enter the Upside Down →
            </button>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "64px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 34, margin: 0 }}>About Chrysalis</h2>
          <p style={{ marginTop: 12, lineHeight: 1.7, color: "#ffdddd", maxWidth: 920 }}>
            Chrysalis is the national-level Creative Writing & Media Olympiad hosted by the Department of English & Cultural Studies, CHRIST (Deemed to be University), Delhi NCR. We celebrate storytelling across mediums — prose, poetry, script, film, and digital art.
          </p>
        </section>

        {/* CATEGORIES */}
        <section id="categories" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 34 }}>Categories</h2>
          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {["Short Story", "Poetry", "Scriptwriting", "Filmmaking", "Blogging", "Photography", "Songwriting", "Storyboards"].map((c) => (
              <motion.div key={c} whileHover={{ scale: 1.02 }} style={{ padding: 16, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,0,0,0.06)" }}>
                <strong style={{ color: "#ff8a8a" }}>{c}</strong>
                <p style={{ marginTop: 8, color: "#ffdede" }}>Submit your best work in this category.</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRIZE POOL */}
        <section id="prizes" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 34 }}>Prize Pool</h2>
          <p style={{ marginTop: 12, color: "#ffdede" }}>Total Prize Pool: <strong style={{ color: "#ff9a9a" }}>₹50,000</strong></p>
          <ul style={{ marginTop: 8, color: "#ffdede" }}>
            <li>Short Story — ₹6,000</li>
            <li>Scriptwriting — ₹10,000</li>
            <li>Short Film — ₹16,000</li>
            <li>Other categories — Awards & Mentions</li>
          </ul>
        </section>

        {/* RULES */}
        <section id="rules" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 34 }}>Rules & Guidelines</h2>
          <div style={{ marginTop: 12, color: "#ffdede", lineHeight: 1.7 }}>
            <ul>
              <li>All submissions must be original and created exclusively for Chrysalis.</li>
              <li>Plagiarism leads to immediate disqualification.</li>
              <li>Participants may submit in multiple categories (follow file-format guidelines).</li>
              <li>Include name, institution, category in your email submission.</li>
            </ul>
          </div>
        </section>

        {/* SUBMIT */}
        <section id="submit" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 34 }}>Submit Your Entry</h2>
          <p style={{ marginTop: 12, color: "#ffdede" }}>
            Email your submission to:
            <br />
            <a href="mailto:ecs.ncr@christuniversity.in" style={{ color: "#ff9a9a", textDecoration: "underline", fontSize: 18 }}>ecs.ncr@christuniversity.in</a>
          </p>
          <p style={{ marginTop: 8, color: "#ffdede" }}>Attach your file + name + institution + category. Submission Deadline: 27 Feb 2026</p>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 34 }}>Contact</h2>
          <p style={{ marginTop: 12, color: "#ffdede" }}>For queries contact: <span style={{ color: "#ff9a9a" }}>ecs.ncr@christuniversity.in</span></p>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: 36, textAlign: "center", borderTop: "1px solid rgba(255,0,0,0.06)", marginTop: 18 }}>
          <div style={{ color: "#ffdede" }}>© 2026 Chrysalis — Department of English & Cultural Studies</div>
          <div style={{ marginTop: 6, color: "#f0dede" }}>Built & Designed by Siddharth Dubey</div>
        </footer>
      </main>

      {/* JUMPSCARE overlay */}
      {showJumpscare && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.06 }} style={{ position: "fixed", inset: 0, zIndex: 99999, background: "radial-gradient(circle at center, rgba(10,0,0,0.98), rgba(0,0,0,0.95))", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <img src={DEMOGORGON_JUMP} alt="demogorgon" style={{ width: "70%", maxWidth: 900, filter: "drop-shadow(0 0 30px rgba(255,0,0,0.9))" }} />
        </motion.div>
      )}

      {/* small utilities */}
      <style>{`
        /* prevent horizontal scroll caused by 100vw usage elsewhere */
        html, body, #root { height: 100%; width: 100%; overflow-x: hidden; }
        @media (pointer: coarse) {
          /* fallback for touch devices */
        }
      `}</style>
    </div>
  );
}
