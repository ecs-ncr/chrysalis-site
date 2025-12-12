// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const videoRef = useRef(null);
  const staticRef = useRef(null);
  const growlRef = useRef(null);
  const rumbleRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);

  const lastScroll = useRef({ time: Date.now(), y: 0 });
  const scrollCooldown = useRef(false);

  // Your video
  const VIDEO_SRC = "/videos/mindflayer.mp4";

  // SFX
  const GROWL_SFX =
    "https://cdn.pixabay.com/download/audio/2022/03/10/audio_74335ce0a6.mp3?filename=monster-growl-108750.mp3";
  const STATIC_SFX =
    "https://cdn.pixabay.com/download/audio/2021/09/27/audio_572cb15c2a.mp3?filename=vhs-static-94416.mp3";
  const RUMBLE_SFX =
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8799c67bb5.mp3?filename=deep-impact-rumble-110144.mp3";

  // Unlock audio/video on first click
  useEffect(() => {
    const unlock = async () => {
      try {
        if (videoRef.current) {
          await videoRef.current.play().catch(() => {});
          videoRef.current.volume = 0.25; // LOWER VOLUME HERE
        }
      } catch (e) {}

      setStarted(true);

      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
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

  // jumpscare on fast scroll
  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastScroll.current.time);
      const dy = Math.abs(y - lastScroll.current.y);

      const speed = dy / dt;
      lastScroll.current = { time: now, y };

      if (!scrollCooldown.current && speed > 1) {
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

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background: "black",
        color: "white",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* VIDEO BACKGROUND – FULL VIEWPORT, NO CROPPING */}
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
          playsInline
          loop
          muted={!started}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // NO CROPPING
            background: "black",
          }}
        />
      </div>

      {/* DARK OVERLAY FOR READABILITY */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          zIndex: -5,
        }}
      />

      {/* AUDIO for effects */}
      <audio ref={growlRef} src={GROWL_SFX} preload="auto" />
      <audio ref={staticRef} src={STATIC_SFX} preload="auto" />
      <audio ref={rumbleRef} src={RUMBLE_SFX} preload="auto" />

      {/* START SCREEN */}
      {!started && (
        <div
          onClick={() => setStarted(true)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            cursor: "pointer",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center" }}
          >
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 48,
                color: "#ff2a2a",
                marginBottom: 10,
              }}
            >
              CHRYSALIS 2026
            </h1>
            <p style={{ color: "#ffbdbd" }}>
              Tap or Click to Start the Experience
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
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 28px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer", color: "#ff3838", fontFamily: "'Cinzel', serif" }}
        >
          CHRYSALIS
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["about", "categories", "prizes", "rules", "submit", "contact"].map(
            (id) => (
              <div
                key={id}
                onClick={() => goTo(id)}
                style={{ cursor: "pointer", opacity: 0.95 }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </div>
            )
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ padding: "120px 20px 60px", maxWidth: 1200, margin: "0 auto" }}>
        {/* HERO */}
        <section id="home" style={{ minHeight: "70vh" }}>
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#ff3838",
              fontSize: "clamp(36px, 7vw, 70px)",
            }}
          >
            CHRYSALIS 2026
          </h1>
          <p style={{ maxWidth: 800, color: "#ffdede" }}>
            National Creative Writing & Media Olympiad — Enter the Upside Down
            of storytelling.
          </p>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding: "50px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            About Chrysalis
          </h2>
          <p>
            Chrysalis is the National Creative Writing & Media Olympiad hosted
            by CHRIST (Deemed to be University), Delhi NCR.
          </p>
        </section>

        {/* CATEGORIES */}
        <section id="categories" style={{ padding: "50px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Categories
          </h2>
          <ul>
            <li>Short Story</li>
            <li>Poetry</li>
            <li>Scriptwriting</li>
            <li>Filmmaking</li>
            <li>Blogging</li>
            <li>Photography</li>
            <li>Songwriting</li>
            <li>Storyboards</li>
          </ul>
        </section>

        {/* PRIZES */}
        <section id="prizes" style={{ padding: "50px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Prize Pool
          </h2>
          <p>Total Prize Pool: ₹50,000</p>
        </section>

        {/* RULES */}
        <section id="rules" style={{ padding: "50px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Rules
          </h2>
          <ul>
            <li>Original work only</li>
            <li>No plagiarism</li>
            <li>Multiple categories allowed</li>
          </ul>
        </section>

        {/* SUBMIT */}
        <section id="submit" style={{ padding: "50px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Submit Your Entry
          </h2>
          <p>
            Email:
            <br />
            <a
              href="mailto:ecs.ncr@christuniversity.in"
              style={{ color: "#ff7a7a" }}
            >
              ecs.ncr@christuniversity.in
            </a>
          </p>
        </section>

        <section id="contact" style={{ padding: "50px 0" }}>
          <h2 style={{ color: "#ff3b3b", fontFamily: "'Cinzel', serif" }}>
            Contact
          </h2>
          <p>For queries: ecs.ncr@christuniversity.in</p>
        </section>
      </main>

      {/* JUMPSCARE */}
      {showJumpscare && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "red", fontSize: 60 }}>👁</h1>
        </motion.div>
      )}
    </div>
  );
}
