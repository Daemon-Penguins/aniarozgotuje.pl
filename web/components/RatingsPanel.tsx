interface ObjectiveRatings {
  czas: number;
  trudnosc: number;
  dostepnosc: number;
  koszt: number;
  powtarzalnosc: number;
}

interface FunnyRatingsData {
  instagramowalnosc: number;
  poziom_stresu: number;
  ile_naczyn_zniszczyles: number;
  reakcja_rodziny: number;
  czy_ania_by_zaakceptowala: boolean;
}

function Stars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "3px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < value ? "star-filled" : "star-empty"}
          style={{ fontSize: "1rem" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function RatingRow({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          fontFamily: "var(--font-inter)",
        }}
      >
        {label}
      </span>
      <div
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <Stars value={value} max={max} />
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            fontFamily: "var(--font-inter)",
            minWidth: "2.5rem",
            textAlign: "right",
          }}
        >
          {value}/{max}
        </span>
      </div>
    </div>
  );
}

const STRESS_LABELS = ["", "zen 🧘", "spoko 😌", "trochę 😅", "stres 😰", "awantura domowa 🔥"];
const FAMILY_LABELS = ["", "niejadalne 💀", "zjadliwe 😐", "okej 👍", "smaczne 😋", "genialne 🤩"];
const DISHES_EMOJI = ["🟢", "🟡", "🟠", "🔴", "💀", "🧨"];

export function FunnyRatings({ ratings }: { ratings: FunnyRatingsData }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        padding: "1.75rem",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--accent-lavender)",
          margin: "0 0 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        🎭 Śmieszne / Abstrakcyjne
      </h3>

      <div>
        {/* Instagramowalnosc */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-inter)" }}>
            Instagramowalność
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Stars value={ratings.instagramowalnosc} />
            {ratings.instagramowalnosc >= 4 && (
              <span style={{ fontSize: "0.8rem" }}>📸</span>
            )}
          </div>
        </div>

        {/* Poziom stresu */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-inter)" }}>
            Poziom stresu
          </span>
          <span
            style={{
              fontSize: "0.875rem",
              color: "white",
              fontFamily: "var(--font-inter)",
            }}
          >
            {STRESS_LABELS[ratings.poziom_stresu] ?? `${ratings.poziom_stresu}/5`}
          </span>
        </div>

        {/* Ile naczyn */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-inter)" }}>
            Ile naczyń zniszczyłeś
          </span>
          <span style={{ fontSize: "1rem" }}>
            {Array.from({ length: Math.min(ratings.ile_naczyn_zniszczyles, 5) }).map((_, i) => (
              <span key={i}>🫙</span>
            ))}
            {ratings.ile_naczyn_zniszczyles === 0 && <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-inter)" }}>żadnego 🏆</span>}
          </span>
        </div>

        {/* Reakcja rodziny */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-inter)" }}>
            Reakcja rodziny
          </span>
          <span
            style={{
              fontSize: "0.875rem",
              color: "white",
              fontFamily: "var(--font-inter)",
            }}
          >
            {FAMILY_LABELS[ratings.reakcja_rodziny] ?? `${ratings.reakcja_rodziny}/5`}
          </span>
        </div>

        {/* Czy Ania by zaakceptowała */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 0",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-inter)" }}>
            Czy Ania by zaakceptowała 🐧
          </span>
          <span
            style={{
              fontSize: "0.9375rem",
              color: ratings.czy_ania_by_zaakceptowala ? "var(--accent-mint)" : "#ff6b6b",
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
            }}
          >
            {ratings.czy_ania_by_zaakceptowala ? "TAK ✓" : "NIE ✗"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ObjectiveRatings({ ratings }: { ratings: ObjectiveRatings }) {
  const entries: Array<{ key: keyof ObjectiveRatings; label: string }> = [
    { key: "czas", label: "Czas (zgadza się z deklarowanym)" },
    { key: "trudnosc", label: "Trudność (rzeczywista vs. obiecana)" },
    { key: "dostepnosc", label: "Dostępność składników" },
    { key: "koszt", label: "Koszt wykonania" },
    { key: "powtarzalnosc", label: "Powtarzalność przepisu" },
  ];

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        padding: "1.75rem",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: "var(--accent-pink)",
          margin: "0 0 0.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        📊 Oceny obiektywne
      </h3>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.8rem",
          fontFamily: "var(--font-inter)",
          margin: "0 0 1.25rem",
        }}
      >
        Rzeczowe, mierzalne kryteria — bez emocji
      </p>

      <div>
        {entries.map(({ key, label }) => (
          <RatingRow key={key} label={label} value={ratings[key]} />
        ))}
      </div>
    </div>
  );
}
