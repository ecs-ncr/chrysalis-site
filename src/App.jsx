import { motion } from "framer-motion";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1a1a2e, #0f0c29, #000)",
      color: "white",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      padding: "80px 40px"
    }}>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "72px",
          fontWeight: "900",
          letterSpacing: "4px"
        }}
      >
        CHRYSALIS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: "22px",
          opacity: 0.85,
          marginTop: "20px",
          maxWidth: "700px"
        }}
      >
        National School-Level Creative Writing & Media Olympiad
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: "50px",
          maxWidth: "650px",
          padding: "40px",
          borderRadius: "28px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)"
        }}
      >
        {[
          "✦ Short Story",
          "✦ Poetry",
          "✦ Scriptwriting",
          "✦ Songwriting",
          "✦ Storyboards",
        ].map((text) => (
          <div key={text} style={{
            fontSize: "20px",
            marginBottom: "18px",
            letterSpacing: "0.5px"
          }}>
            {text}
          </div>
        ))}
      </motion.div>

    </div>
  );
}
