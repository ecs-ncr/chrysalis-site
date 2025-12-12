// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  FINAL VIDEO-BACKGROUND App.jsx
  - Video path used: /videos/mindflayer.mp4 (in public/videos/)
  - Video audio plays only after first click/tap (Option B)
  - Jumpscare (growl + static) still active on fast scroll
  - No 100vw cropping issues; responsive + full-screen
*/

export default function App() {
  // Refs
  const videoRef = useRef(null);
  const staticRef = useRef(null);
  const growlRef = useRef(null);
  const rumbleRef = useRef(null);

  // State
  const [started, setStarted] = useState(false); // user-interaction unlocked playback
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const lastScroll = useRef({ time: Date.now(), y: 0 });
  const scrollCooldown = useRef(false);

  // Media paths
  const VIDEO_SRC = "/videos/mindflayer.mp4"; // <- your file in public/videos/
  const DEMOGORGON_JUMP = "https://i.ibb.co/9g1mZ6m/demogorgon-jump.png";
  const RED_FOG = "https://i.ibb.co/K6Z2kTL/redfog.png";
  const STATIC_GIF = "https://i.ibb.co/0jVhYjH/static.gif";

  // SFX (hosted) - only used for jumpscare / rumble
  const GROWL_SFX = "https://cdn.pixabay.com/download/audio/2022/03/10/audio_74335ce0a6.mp3?filename=monster-growl-108750.mp3";
  const STATIC_SFX = "https://cdn.pixabay.com/download/audio/2021/09/27/audio_572cb15c2a.mp3?filename=vhs-static-94416.mp3";
  const RUMBLE_SFX = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8799c67bb5.mp3?filename=deep-impact-rumble-110144.mp3";

  // Unlock playback on first user interaction (click or keydown or touch)
  useEffect(() => {
    const unlock = async () => {
      if (started) return;
      try {
        // Play the video with audio (unmuted)
        if (videoRef.current) {
          // ensure it's allowed to play; we call play after interaction
          await videoRef.current.play().catch(() => {});
          // set a sensible volume for the video audio
          try { videoRef.current.volume = 0.7; } catch (e) {}
        }
        setStarted(true);
      } catch (e) {
        // ignore
        setStarted(true);
      } finally {
        window.removeEventListener("click", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("touchstart", unlock);
      }
    };

    // add listeners
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    // cleanup (in case component unmounts)
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [started]);

  // Cursor follow
  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Footstep + rumble on click (keeps clicks interactive even after video start)
  useEffect(() => {
    const onClick = (e) => {
      if (rumbleRef.current) {
        try {
          rumbleRef.current.currentTime = 0;
          rumbleRef.current.volume = 0.45;
          rumbleRef.current.play().catch(() => {});
        } catch (err) {}
      }
      // visual footstep handled elsewhere if desired
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  // Jumpscare on fast scroll detection (plays growl + static hits)
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

        // play growl
        try {
          if (growlRef.current) {
            growlRef.current.currentTime = 0;
            growlRef.current.volume = 0.95;
            growlRef.current.play().catch(() => {});
          }
        } catch (e) {}

        // play static hit
        try {
          if (staticRef.current) {
            staticRef.current.currentTime = 0;
            staticRef.current.volume = 0.9;
            staticRef.current.play().catch(() => {});
          }
        } catch (e) {}

        setTimeout(() => setShowJumpscare(false), 900);
        // cooldown before another jumpscare
        setTimeout(() => (scrollCooldown.current = false), 6000);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // helper for smooth scrolling
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // Styles (avoid 100vw to prevent horizontal overflow)
  const outerStyle = {
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    background: "#000",
    color: "#fff",
    position: "relative",
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  };

  return (
    <div style={outerStyle}>
      {/* -----------------------------
          Video background (full-site)
          ----------------------------- */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        playsInline
        loop
        muted={!started} // muted until user interacts (we start playback on interaction)
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -10,
          pointerEvents: "none",
        }}
      />

      {/* red fog overlay */}
      <motion.div
        animate={{ opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -5,
          backgroundImage: `url(${RED_FOG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* static overlay */}
      <motion.div
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -4,
          backgroundImage: `url(${STATIC_GIF})`,
          backgroundSize: "cover",
          mixBlendMode: "screen",
          pointerEvents: "none",
          opacity: 0.04,
        }}
      />

      {/* dark layer to ensure readability */}
      <div style={{ position: "fixed", inset: 0, zIndex: -3, background: "rgba(0,0,0,0.45)", pointerEvents: "none" }} />

      {/* hidden audio elements used for SFX (growl / static / rumble) */}
      <audio ref={growlRef} src={GROWL_SFX} preload="auto" />
      <audio ref={staticRef} src={STATIC_SFX} preload="auto" />
      <audio ref={rumbleRef} src={RUMBLE_SFX} preload="auto" />

      {/* Start overlay (visible until started) */}
      {!started && (
        <div
          onClick={() => {
            // explicit unlock on click as well
            try {
              videoRef.current?.play().catch(() => {});
            } catch (e) {}
            setStarted(true);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3))",
          }}
        >
          <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} style={{ textAlign: "center", padding: 28, borderRadius: 12 }}>
            <h1 style={{ fontFamily: "'Cinzel', serif", color: "#ff2a2a", fontSize: 46, margin: 0, textShadow: "0 0 18px rgba(255,0,0,0.7)" }}>
              CHRYSALIS 2026
            </h1>
            <p style={{ color: "#ffbdbd", marginTop: 10 }}>Tap / Click anywhere to start the experience</p>
            <button style={{ marginTop: 18, padding: "10px 18px", background: "#ff1a1a", color: "white", border: "none", borderRadius: 8, fontWeight: 700 }}>Enter the Upside Down</button>
          </motion.div>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", background: "rgba(0,0,0,0.38)", backdropFilter: "blur(6px)", borderBottom: "1px solid rgba(255,0,0,0.08)" }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", cursor: "pointer", fontWeight: 800, fontSize: 18 }}>
          CHRYSALIS
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {[["About", "about"], ["Categories", "categories"], ["Prizes", "prizes"], ["Rules", "rules"], ["Submit", "submit"], ["Contact", "contact"]].map(([label, id]) => (
            <div key={id} onClick={() => goTo(id)} style={{ cursor: "pointer", color: "#fff", opacity: 0.95, fontSize: 15 }}>
              {label}
            </div>
          ))}
        </div>
      </nav>

      {/* Main content container */}
      <main style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1200, margin: "0 auto", padding: "110px 20px 60px" }}>
        {/* HERO */}
        <section id="home" style={{ minHeight: "78vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ fontFamily: "'Cinzel', serif", color: "#ff2a2a", fontSize: "clamp(36px, 6vw, 64px)", margin: 0, letterSpacing: 3, textShadow: "0 0 18px rgba(255,0,0,0.6)" }}>
            CHRYSALIS 2026
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} transition={{ delay: 0.2 }} style={{ color: "#ffdede", maxWidth: 820 }}>
            National Creative Writing & Media Olympiad — a festival of narrative, media and imagination. Enter the Upside Down of storytelling.
          </motion.p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => goTo("about")} style={{ padding: "10px 18px", background: "#ff1a1a", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
              Enter the Upside Down →
            </button>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "64px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 32, margin: 0 }}>About Chrysalis</h2>
          <p style={{ marginTop: 12, color: "#ffdede", lineHeight: 1.7, maxWidth: 920 }}>
            Chrysalis is the national Creative Writing & Media Olympiad hosted by the Department of English & Cultural Studies, CHRIST (Deemed to be University), Delhi NCR.
          </p>
        </section>

        {/* CATEGORIES */}
        <section id="categories" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 32 }}>Categories</h2>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {["Short Story", "Poetry", "Scriptwriting", "Filmmaking", "Blogging", "Photography", "Songwriting", "Storyboards"].map((c) => (
              <motion.div whileHover={{ scale: 1.02 }} key={c} style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,0,0,0.06)" }}>
                <strong style={{ color: "#ff8a8a" }}>{c}</strong>
                <p style={{ marginTop: 6, color: "#ffdede" }}>Submit your best work in this category.</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRIZES */}
        <section id="prizes" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 32 }}>Prize Pool</h2>
          <p style={{ marginTop: 12, color: "#ffdede" }}>Total Prize Pool: <strong style={{ color: "#ff9a9a" }}>₹50,000</strong></p>
          <ul style={{ marginTop: 12, color: "#ffdede" }}>
            <li>Short Story — ₹6,000</li>
            <li>Scriptwriting — ₹10,000</li>
            <li>Short Film — ₹16,000</li>
            <li>Other categories — Awards & Mentions</li>
          </ul>
        </section>

        {/* RULES */}
        <section id="rules" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 32 }}>Rules & Guidelines</h2>
          <ul style={{ marginTop: 12, color: "#ffdede", lineHeight: 1.7 }}>
            <li>All submissions must be original and created exclusively for Chrysalis.</li>
            <li>Plagiarism leads to immediate disqualification.</li>
            <li>Participants may submit in multiple categories (follow file-format guidelines).</li>
            <li>Include name, institution, category in your email submission.</li>
          </ul>
        </section>

        {/* SUBMIT */}
        <section id="submit" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 32 }}>Submit Your Entry</h2>
          <p style={{ marginTop: 12, color: "#ffdede" }}>
            Email your submission to: <br />
            <a href="mailto:ecs.ncr@christuniversity.in" style={{ color: "#ff9a9a", textDecoration: "underline" }}>ecs.ncr@christuniversity.in</a>
          </p>
          <p style={{ marginTop: 8, color: "#ffdede" }}>Attach your file + name + institution + category. Deadline: 27 Feb 2026</p>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "48px 0", borderTop: "1px solid rgba(255,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", color: "#ff3b3b", fontSize: 32 }}>Contact</h2>
          <p style={{ marginTop: 12, color: "#ffdede" }}>For queries contact: <span style={{ color: "#ff9a9a" }}>ecs.ncr@christuniversity.in</span></p>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: 28, textAlign: "center", borderTop: "1px solid rgba(255,0,0,0.06)", marginTop: 18 }}>
          <div style={{ color: "#ffdede" }}>© 2026 Chrysalis — Department of English & Cultural Studies</div>
          <div style={{ marginTop: 6, color: "#f0dede" }}>Built & Designed by Siddharth Dubey</div>
        </footer>
      </main>

      {/* JUMPSCARE overlay */}
      {showJumpscare && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.06 }} style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at center, rgba(10,0,0,0.98), rgba(0,0,0,0.95))", pointerEvents: "none" }}>
          <img src={DEMOGORGON_JUMP} alt="demogorgon" style={{ width: "70%", maxWidth: 900, filter: "drop-shadow(0 0 30px rgba(255,0,0,0.9))" }} />
        </motion.div>
      )}
    </div>
  );
}
