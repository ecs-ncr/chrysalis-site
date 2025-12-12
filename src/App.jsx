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

  // Local video
  const VIDEO_SRC = "/videos/mindflayer.mp4";

  // Minimal SFX
  const GROWL_SFX =
    "https://cdn.pixabay.com/audio/2022/03/10/audio_74335ce0a6.mp3";
  const STATIC_SFX =
    "https://cdn.pixabay.com/audio/2021/09/27/audio_572cb15c2a.mp3";

  // Unlock audio/video on first click
  useEffect(() => {
    const unlock = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.18;
        videoRef.current.play().catch(() => {});
      }
      setStarted(true);
    };

    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // Jumpscare (flash) on FAST scroll
  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastScroll.current.time);
      const dy = Math.abs(y - lastScroll.current.y);
      const speed = dy / dt;

      lastScroll.current = { time: now, y };

      if (!scrollCooldown.current && speed > 1.3) {
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

        setTimeout(() => setShowJumpscare(false), 180);
        setTimeout(() => (scrollCooldown.current = false), 5000);
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
        background: "black",
        color: "white",
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* PERFECT FULLSCREEN VIDEO BACKGROUND */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: -10,
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          loop
          playsInline
          muted={!started}
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

      {/* TRANSLUCENT OVERLAY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -5,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "brightness(0.85)",
        }}
      />

      {/* Audio */}
      <audio ref={growlRef} src={GROWL_SFX} preload="auto" />
      <audio ref={staticRef} src={STATIC_SFX} preload="auto" />

      {/* START SCREEN */}
      {!started && (
        <div
          onClick={() => setStarted(true)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1
              style={{
                fontFamily: "Cinzel, serif",
                color: "#ff2a2a",
                fontSize: "3rem",
                textShadow: "0 0 20px red",
                textAlign: "center",
              }}
            >
              CHRYSALIS 2026
            </h1>
            <p style={{ textAlign: "center", color: "#ffcccc" }}>
              Click Anywhere to Begin
            </p>
          </motion.div>
        </div>
      )}

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          padding: "16px 28px",
          display: "flex",
          justifyContent: "space-between",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
          zIndex: 50,
        }}
      >
        <div
          style={{ fontFamily: "Cinzel", color: "#ff3b3b", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          CHRYSALIS
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["about", "categories", "prizes", "rules", "submit", "contact"].map(
            (id) => (
              <div
                key={id}
                onClick={() => goTo(id)}
                style={{ cursor: "pointer" }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </div>
            )
          )}
        </div>
      </nav>

      {/* CONTENT */}
      <main style={{ paddingTop: "140px", padding: "20px", maxWidth: 900, margin: "auto" }}>
        {/* HERO */}
        <h1
          style={{
            fontFamily: "Cinzel",
            color: "#ff3b3b",
            fontSize: "clamp(40px, 6vw, 80px)",
            textShadow: "0 0 15px red",
          }}
        >
          CHRYSALIS 2026
        </h1>
        <p style={{ color: "#ffdede", maxWidth: 700 }}>
          National Creative Writing & Media Olympiad — Enter the Upside Down of
          storytelling.
        </p>

        {/* ABOUT */}
        <section id="about" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "Cinzel" }}>
            About Chrysalis
          </h2>
          <p>
            Hosted by the Department of English & Cultural Studies, CHRIST
            (Deemed to be University), Delhi NCR.
          </p>
        </section>

        {/* CATEGORIES */}
        <section id="categories" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "Cinzel" }}>
            Categories
          </h2>
          <ul>
            <li>Poetry</li>
            <li>Songwriting</li>
            <li>Short Story</li>
            <li>Scriptwriting</li>
            <li>Short Film</li>
          </ul>
        </section>

        {/* PRIZES */}
        <section id="prizes" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "Cinzel" }}>
            Prize Pool
          </h2>
          <ul>
            <li>Poetry — ₹3,000</li>
            <li>Songwriting — ₹5,000</li>
            <li>Short Story — ₹6,000</li>
            <li>Scriptwriting — ₹10,000</li>
            <li>Short Film — ₹16,000</li>
          </ul>
          <p style={{ marginTop: 10 }}>Total: ₹45,000</p>
        </section>

        {/* RULES */}
        <section id="rules" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "Cinzel" }}>
            Rules & Guidelines
          </h2>
          <ul>
            <li>Only school students (Classes 9–12) may participate.</li>
            <li>All work must be original.</li>
            <li>No plagiarism.</li>
            <li>Multiple category entries allowed.</li>
            <li>Follow category-specific file formats.</li>
            <li>Include name, school, and category in the email.</li>
          </ul>
        </section>

        {/* SUBMIT */}
        <section id="submit" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "Cinzel" }}>
            Submit Your Entry
          </h2>
          <p>
            Email your submission to:
            <br />
            <a
              href="mailto:ecs.ncr@christuniversity.in"
              style={{ color: "#ff7a7a" }}
            >
              ecs.ncr@christuniversity.in
            </a>
          </p>
          <p>Deadline: 27 Feb 2026</p>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding: "60px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "Cinzel" }}>Contact</h2>
          <p>Queries: ecs.ncr@christuniversity.in</p>
        </section>

        <footer style={{ textAlign: "center", opacity: 0.8, padding: "20px 0" }}>
          © 2026 Chrysalis — Dept. of English & Cultural Studies  
          <br />
          Designed by <strong>Siddharth Dubey</strong>
        </footer>
      </main>

      {/* FLASH JUMPSCARE */}
      {showJumpscare && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,40,40,0.25)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
