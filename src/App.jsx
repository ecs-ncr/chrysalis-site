import { motion } from "framer-motion";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
      color: "white",
      fontFamily: "Inter, sans-serif",
      padding: "60px"
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: "64px", fontWeight: "900" }}
      >
        CHRYSALIS
      </motion.h1>

      <p style={{ fontSize: "22px", marginTop: "20px" }}>
        National Creative Writing & Media Competition
      </p>

      <div style={{
        marginTop: "40px",
        padding: "30px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.08)",
        maxWidth: "600px"
      }}>
        <p>✨ Short Story</p>
        <p>✨ Poetry</p>
        <p>✨ Scriptwriting</p>
        <p>✨ Songwriting</p>
        <p>✨ Storyboards</p>
      </div>
    </div>
  );
}
