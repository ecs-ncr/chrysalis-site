import React from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Award } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b0f1a] via-[#6b1f24] to-[#ff7a5c] text-white font-sans">

      {/* HEADER */}
      <header className="backdrop-blur-sm bg-black/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">CHRYSALIS</h1>
          <nav className="hidden md:flex gap-6">
            <a href="#about">About</a>
            <a href="#categories">Categories</a>
            <a href="#submit">Submit</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-extrabold mb-4">CHRYSALIS 2026</h2>
          <p className="text-lg mb-6">
            A national creative writing and media olympiad for school students.
          </p>

          <div className="flex gap-4">
            <a
              href="#submit"
              className="bg-white text-[#6b1f24] px-6 py-3 rounded-lg font-bold"
            >
              Submit Entry
            </a>
            <a
              href="/assets/Chrysalis.pdf"
              target="_blank"
              className="border px-6 py-3 rounded-lg"
            >
              Download Info
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src="/assets/poster.png"
            alt="Poster"
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </main>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-4">About Chrysalis</h3>
        <p>
          Chrysalis is a national-level creative writing and media competition
          organised by the Department of English & Cultural Studies, CHRIST
          University.
        </p>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-6">Categories</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Short Story",
            "Poetry",
            "Songwriting",
            "Scriptwriting",
            "Storyboards"
          ].map((cat) => (
            <div
              key={cat}
              className="bg-white/10 p-6 rounded-xl hover:-translate-y-2 transition"
            >
              <h4 className="text-xl font-semibold">{cat}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMISSION */}
      <section id="submit" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-4">Submit Your Entry</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted (demo)!");
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            placeholder="Your Name"
            required
            className="p-3 rounded bg-white/10"
          />
          <input
            placeholder="School Name"
            required
            className="p-3 rounded bg-white/10"
          />
          <input
            placeholder="Class"
            required
            className="p-3 rounded bg-white/10"
          />

          <select className="p-3 rounded bg-white/10">
            <option>Short Story</option>
            <option>Poetry</option>
            <option>Songwriting</option>
            <option>Scriptwriting</option>
            <option>Storyboards</option>
          </select>

          <input type="file" className="md:col-span-2" required />

          <button className="md:col-span-2 bg-white text-black py-3 rounded font-bold">
            Submit
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-white/70">
        © 2026 Chrysalis — CHRIST University
      </footer>
    </div>
  );
}
