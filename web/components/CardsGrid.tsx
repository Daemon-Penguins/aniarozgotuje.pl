"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const ACCENT_COLORS = {
  mint: "#a0e4c4",
  lavender: "#c4a0f4",
  peach: "#f4c4a0",
} as const;

type AccentColor = keyof typeof ACCENT_COLORS;

interface MockPost {
  slug: string;
  title: string;
  source: string;
  difficulty: number;
  ratingTeaser: string;
  accentColor: AccentColor;
}

const mockPosts: MockPost[] = [
  {
    slug: "placek-ziemniaczany",
    title: "Placek ziemniaczany — czy warto?",
    source: "Ania Gotuje",
    difficulty: 2,
    ratingTeaser:
      "Przypalony za pierwszym razem, ale za drugim wyszedł genialnie",
    accentColor: "mint",
  },
  {
    slug: "zupa-pomidorowa",
    title: "Zupa pomidorowa babci vs. Ania Gotuje",
    source: "Ania Gotuje",
    difficulty: 3,
    ratingTeaser: "Rodzina powiedziała 'tak sobie'. Babcia wygrała.",
    accentColor: "mint",
  },
  {
    slug: "sernik-nowojorski",
    title: "Sernik nowojorski — poziom stresu: 5/5",
    source: "Ania Gotuje",
    difficulty: 4,
    ratingTeaser:
      "8 godzin chłodzenia. Stres o spękania. Finalnie — przepyszny.",
    accentColor: "lavender",
  },
];

function StarRow({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < value ? "star-filled" : "star-empty"}
          style={{ fontSize: "0.75rem" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function PostCard({ post }: { post: MockPost }) {
  const color = ACCENT_COLORS[post.accentColor];

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: `0 0 30px ${color}22, 0 8px 32px rgba(0,0,0,0.4)`,
        borderColor: `${color}44`,
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        background: "rgba(22, 22, 22, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "1rem",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image placeholder */}
      <Link href={`/test/${post.slug}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            height: "200px",
            background: `linear-gradient(135deg, var(--bg-card) 0%, #1a1a1a 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 50%, ${color}14 0%, transparent 70%)`,
            }}
          />
          <span style={{ fontSize: "3rem", zIndex: 1 }}>🍽️</span>
        </div>
      </Link>

      {/* Card body */}
      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* Source badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.7rem",
            color: color,
            background: `${color}14`,
            border: `1px solid ${color}30`,
            padding: "0.2rem 0.65rem",
            borderRadius: "2rem",
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
          }}
        >
          📍 {post.source}
        </span>

        {/* Title */}
        <Link href={`/test/${post.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            {post.title}
          </h3>
        </Link>

        {/* Difficulty */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-inter)",
          }}
        >
          <span>Trudność:</span>
          <StarRow value={post.difficulty} />
        </div>

        {/* Teaser */}
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-inter)",
            fontStyle: "italic",
            margin: 0,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          &ldquo;{post.ratingTeaser}&rdquo;
        </p>

        {/* Read more */}
        <Link
          href={`/test/${post.slug}`}
          style={{
            fontSize: "0.8125rem",
            color: color,
            textDecoration: "none",
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            marginTop: "auto",
          }}
        >
          Czytaj test →
        </Link>
      </div>
    </motion.div>
  );
}

export function CardsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="posty"
      ref={ref}
      style={{
        padding: "6rem 1.5rem",
        background: "var(--bg-primary)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3rem" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "white",
              margin: 0,
            }}
          >
            Ostatnie testy
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-inter)",
              marginTop: "0.5rem",
              fontSize: "0.9375rem",
            }}
          >
            Sprawdzamy, czy przepisy z internetu naprawdę wychodzą
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mockPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
