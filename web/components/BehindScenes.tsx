"use client";

import { useState } from "react";

interface BehindScenesProps {
  text: string;
}

export function BehindScenes({ text }: BehindScenesProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.75rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "white",
          fontFamily: "var(--font-playfair)",
          fontSize: "1.1rem",
          fontWeight: 700,
          textAlign: "left",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          🎬 Za kulisami
        </span>
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "1.25rem",
            transition: "transform 0.25s ease",
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ↓
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: "0 1.75rem 1.75rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.25rem",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
