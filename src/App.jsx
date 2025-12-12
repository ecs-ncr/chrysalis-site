// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const videoRef = useRef(null);
  const staticRef = useRef(null);
  const growlRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);

  const lastScroll = useRef({ time: Date.now(), y: 0 });
  const scrollCooldown = useRef(false);

  // Your local video
  const VIDEO_SRC = "/videos/mindflayer.mp4";

  // Audio SFX
  const GROWL_SFX =
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_74335ce0a6.mp3?filename=monster-growl-108750.mp3";
  const STATIC_SFX =
    "https://cdn.pixabay.com/download/audio/2021/09/27/audio_572cb15c2a.mp3?filename=vhs-static-94416.mp3";

  // Unlock video + audio on first interaction
  useEffect(() => {
    const unlock = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.18; // LOWER VOLUME
        videoRef.current.play().catch(() => {});
      }
      setStarted(true);
    };

    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // Jumpscare on FAST scroll
  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastScroll.current.time);
      const dy = Math.abs(y - lastScroll.current.y);

      const speed = dy / dt;

      lastScroll.current = { time: now, y };

      if (!scrollCooldown.current && speed > 1.2) {
        scrollCooldown.current = true;
        setShowJumpscare(true);

        try {
          growlRef.current.currentTime = 0;
          growlRef.current.play().catch(() => {});
        } catch (_) {}

        try {
          staticRef.current.currentTime = 0;
          staticRef.current.play().catch(() => {});
        } catch (_) {}

        setTimeout(() => setShowJumpscare(false), 900);
        setTimeout(() => (scrollCooldown.current = false), 6000);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "black",
        color: "white",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* PERFECT FULL-SCREEN VIDEO */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          loop
          muted={!started}
          playsInline
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ensures full coverage
            background: "black",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: -5,
        }}
      />

      {/* Audio elements */}
      <audio ref={growlRef} src={GROWL_SFX} preload="auto" />
      <audio ref={staticRef} src={STATIC_SFX} preload="auto" />

      {/* Start screen */}
      {!started && (
        <div
          onClick={() => setStarted(true)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                color: "#ff2a2a",
                fontSize: 48,
                marginBottom: 10,
                textShadow: "0 0 20px red",
              }}
            >
              CHRYSALIS 2026
            </h1>
            <p style={{ color: "#ffbdbd" }}>Click Anywhere to Begin</p>
          </motion.div>
        </div>
      )}

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 28px",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            cursor: "pointer",
            color: "#ff3838",
            fontFamily: "'Cinzel', serif",
          }}
        >
          CHRYSALIS
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["about", "categories", "prizes", "rules", "submit", "contact"].map(
            (id) => (
              <div
                key={id}
                onClick={() => goTo(id)}
                style={{ cursor: "pointer", opacity: 0.9 }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </div>
            )
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ padding: "120px 20px 60px", maxWidth: "900px", margin: "0 auto" }}>
        {/* HERO */}
        <section style={{ minHeight: "70vh" }}>
          <h1
            style={{
              color: "#ff3b3b",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontFamily: "'Cinzel', serif",
              textShadow: "0 0 18px red",
            }}
          >
            CHRYSALIS 2026
          </h1>
          <p style={{ color: "#ffdede", maxWidth: 700 }}>
            National Creative Writing & Media Olympiad — Enter the Upside Down of storytelling.
          </p>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            About Chrysalis
          </h2>
          <p style={{ lineHeight: 1.7 }}>
            Chrysalis is the national Creative Writing & Media Olympiad hosted by the
            Department of English & Cultural Studies, CHRIST (Deemed to be University), Delhi NCR.
          </p>
        </section>

        {/* CATEGORIES */}
        <section id="categories" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Categories
          </h2>

          <ul style={{ lineHeight: 1.8 }}>
            <li>Poetry</li>
            <li>Songwriting</li>
            <li>Short Story</li>
            <li>Scriptwriting</li>
            <li>Short Film</li>
          </ul>
        </section>

        {/* PRIZES */}
        <section id="prizes" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Prize Pool
          </h2>

          <ul style={{ lineHeight: 2 }}>
            <li>Poetry — ₹3,000</li>
            <li>Songwriting — ₹5,000</li>
            <li>Short Story — ₹6,000</li>
            <li>Scriptwriting — ₹10,000</li>
            <li>Short Film — ₹16,000</li>
          </ul>

          <p style={{ marginTop: 10, color: "#ffdede" }}>
            <strong>Total Prize Pool: ₹45,000</strong>
          </p>
        </section>

        {/* RULES */}
        <section id="rules" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Rules & Guidelines
          </h2>

          <ul style={{ lineHeight: 1.8 }}>
            <li>Only school students (Classes 9–12) may participate.</li>
            <li>All submissions must be original and created exclusively for Chrysalis.</li>
            <li>Plagiarism leads to immediate disqualification.</li>
            <li>Participants may enter multiple categories.</li>
            <li>Follow file-format rules for each submission.</li>
            <li>Include name, institution, and category in your email.</li>
          </ul>
        </section>

        {/* SUBMIT */}
        <section id="submit" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Submit Your Entry
          </h2>

          <p style={{ lineHeight: 1.6 }}>
            Email your submission to:
            <br />
            <a href="mailto:ecs.ncr@christuniversity.in" style={{ color: "#ff7a7a" }}>
              ecs.ncr@christuniversity.in
            </a>
          </p>

          <p style={{ color: "#ffdede" }}>
            Include: Name • School • Category  
            <br />
            Deadline: 27 Feb 2026
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Contact
          </h2>
          <p>For queries: ecs.ncr@christuniversity.in</p>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            padding: "30px 0",
            textAlign: "center",
            opacity: 0.8,
            marginTop: 20,
          }}
        >
          © 2026 Chrysalis — Dept. of English & Cultural Studies  
          <br />
          Built & Designed by <strong>Siddharth Dubey</strong>
        </footer>
      </main>

      {/* JUMPSCARE */}
      {showJumpscare && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "red", fontSize: 90, textShadow: "0 0 40px red" }}>
            👁
          </h1>
        </motion.div>
      )}
    </div>
  );
}
