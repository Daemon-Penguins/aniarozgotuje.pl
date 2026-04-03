"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      {/* Photo placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(244,160,181,0.07) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(196,160,244,0.05) 0%, transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "8%",
            transform: "translateY(-50%)",
            width: "min(400px, 40vw)",
            height: "min(500px, 50vw)",
            background: "var(--bg-card)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "2rem" }}>👩‍🍳</span>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-inter)",
            }}
          >
            Zdjęcie Ani — wkrótce
          </span>
        </div>
      </div>

      {/* Dark gradient overlay from bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.6) 60%, #0a0a0a 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "left",
          padding: "0 1.5rem",
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              color: "var(--accent-pink)",
              fontSize: "0.8125rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
            }}
          >
            Recenzje kulinarne
          </p>

          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Ania
            <br />
            <span style={{ color: "var(--accent-pink)" }}>Rozgotuje</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "var(--text-muted)",
              maxWidth: "480px",
              lineHeight: 1.6,
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
            }}
          >
            Testujemy przepisy zamiast was
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ marginTop: "3rem" }}
        >
          <a
            href="#posty"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--accent-pink)",
              border: "1px solid rgba(244,160,181,0.3)",
              padding: "0.75rem 1.5rem",
              borderRadius: "2rem",
              textDecoration: "none",
              fontSize: "0.9375rem",
              fontFamily: "var(--font-inter)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(244,160,181,0.08)";
              e.currentTarget.style.borderColor = "rgba(244,160,181,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(244,160,181,0.3)";
            }}
          >
            ostatnie testy ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
