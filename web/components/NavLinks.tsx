"use client";

import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Testy" },
  { href: "/przepisy/ania-gotuje", label: "Ania Gotuje" },
  { href: "/kategoria", label: "Kategorie" },
];

export function NavLinks() {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      {NAV_ITEMS.map(({ href, label }) => (
        <Link key={href} href={href} className="nav-link">
          {label}
        </Link>
      ))}
    </nav>
  );
}
