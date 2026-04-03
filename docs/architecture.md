# Architektura — Ania Rozgotuje

## Stack techniczny

### Frontend
- **Next.js 14** (App Router, SSR/SSG)
- **TypeScript**
- **Tailwind CSS** — dark theme, pastelowe akcenty
- **Framer Motion** — animacje, efekty wizualne
- **next-auth v5** — OIDC/OAuth z Google

### Backend / CMS
- **Sanity.io** — CMS (przepisy, media, galerie, behind-scenes)
- **Supabase** (PostgreSQL) — użytkownicy, uprawnienia, oceny
- **Vercel** — hosting + edge functions

### Auth
- **Google OIDC** (next-auth)
- MVP1: role `moderator` i `admin` tylko
- Future: role `user` (konta publiczne, komentarze, ulubione)

---

## Uprawnienia (RBAC)

| Rola | MVP1 | Future |
|------|------|--------|
| `admin` | full access | full access |
| `moderator` | create/edit/publish posty | + manage users |
| `user` | — | komentarze, oceny, ulubione |
| `guest` | tylko czytanie | tylko czytanie |

### Tabela `roles` (Supabase)
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  role TEXT CHECK (role IN ('admin', 'moderator', 'user')),
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  granted_by UUID
);
```

---

## Struktura posta (Karta Testu)

```
POST SCHEMA (Sanity)
├── meta
│   ├── title (SEO H1)
│   ├── slug (SEO URL)
│   ├── seoTitle (meta title)
│   ├── seoDescription (meta description 155 znaków)
│   ├── publishedAt
│   └── tags[]
│
├── hero
│   ├── heroImage (główne zdjęcie — Ania lub danie)
│   └── heroVideo (opcjonalne — autoplay bez dźwięku)
│
├── source
│   ├── originalTitle
│   ├── originalUrl (link do oryginału — SEO + legal)
│   ├── originalAuthor
│   └── testedOn (data testu)
│
├── ingredients[]
│   ├── name
│   ├── amount
│   └── unit
│
├── media
│   ├── youtubeUrl (długi film)
│   ├── youtubeShortUrl
│   ├── tiktokUrl
│   └── instagramReelUrl
│
├── gallery[] (opcjonalna)
│   └── image + caption
│
├── ratings
│   ├── difficulty (1-5)
│   ├── taste (1-5)
│   ├── quality (1-5)
│   └── categories[] — patrz niżej
│
├── behindScenes (opcjonalne)
│   ├── text (blok)
│   └── gallery[]
│
└── body (rich text — opis przebiegu testu)
```

---

## Kategorie ocen

### Obiektywne (rzeczowe)
- `czas` — czy zgadza się deklarowany czas
- `trudnosc` — rzeczywista vs deklarowana
- `dostepnosc` — łatwość kupna składników
- `koszt` — koszt wykonania
- `powtarzalnosc` — czy przepis wychodzi za każdym razem
- `opis` — jakość opisu w oryginale

### Abstrakcyjne / śmieszne
- `instagramowalnosc` — czy to wygląda jak na zdjęciu
- `poziom_stresu` — 1=zen, 5=awantura domowa
- `ile_naczyn_zniszczyles` — 0–∞
- `reakcja_rodziny` — od "zjadliwe" do "genialne"
- `czy_to_warte_zachodu` — tak/nie/zalezy_od_dnia
- `szansa_na_powrot` — czy zrobimy to znowu
- `poziom_rozczarowania` — skala "oczekiwania vs rzeczywistość"
- `czy_ania_by_zaakceptowala` — 🐧 subiektywna ocena Skipper Edition

---

## UI/UX — Design System

### Kolory
```css
/* Baza */
--bg-primary: #0a0a0a;      /* prawie czarny */
--bg-secondary: #111111;
--bg-card: #161616;
--text-primary: #ffffff;
--text-muted: #a0a0a0;

/* Pastelowe akcenty */
--accent-pink: #f4a0b5;
--accent-mint: #a0e4c4;
--accent-lavender: #c4a0f4;
--accent-peach: #f4c4a0;

/* Borders */
--border-default: 1px solid rgba(255,255,255,0.08);
--border-accent: 1px solid var(--accent-pink); /* na hover/focus */
```

### Typografia
- **Headings:** `Playfair Display` (serif, charakter) lub `DM Serif Display`
- **Body:** `Inter` (czytelność)
- **Mono/labels:** `JetBrains Mono`

### Efekty wizualne
- **Glassmorphism** na kartach: `backdrop-filter: blur(12px)`, lekkie tło semi-transparent
- **Gradient overlay** na hero: ciemny gradient od dołu
- **Hover na kartach:** lekki glow obrysu w pastelowym kolorze (box-shadow)
- **Scroll animations:** Framer Motion — fade-in od dołu, staggered cards
- **Floating particles** (opcjonalne, subtelne) — CSS tylko, bez library
- **Noise texture** na bg — subtelny szum dla głębi

### Hero
```
┌─────────────────────────────────────────────┐
│  [ZDJĘCIE ANI — placeholder na start]       │
│  ciemny gradient overlay od dołu            │
│                                             │
│  Ania Rozgotuje                             │  ← H1, duży, Playfair
│  Testujemy przepisy zamiast was             │  ← subtytuł
│                                             │
│  [ostatnie testy ↓]                         │
└─────────────────────────────────────────────┘
```

---

## Share Buttons

### Platformy + dopasowanie materiału

| Przycisk | Kolor na hover | URL share | Materiał |
|----------|---------------|-----------|----------|
| Facebook | `#1877F2` | `fb.com/sharer?u={url}` | link do artykułu |
| Instagram | gradient `#833ab4→#fd1d1d→#fcb045` | deeplink IG | Reel URL |
| TikTok | `#ff0050` | `tiktok.com/share` | Short URL |
| YouTube | `#FF0000` | `youtube.com/share` | Short URL |

**Ikony platform wideo** (na karcie posta):
- Pojawiają się tylko jeśli dany URL jest uzupełniony w CMS
- Małe ikonki pod tytułem: YouTube | YT Short | TikTok | IG
- Klik → otwiera embed lub przenosi na platformę

### CSS Share Buttons
```css
.share-btn {
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  transition: all 0.2s ease;
}
.share-btn.facebook:hover { color: #1877F2; border-color: #1877F2; }
.share-btn.tiktok:hover   { color: #ff0050; border-color: #ff0050; }
.share-btn.instagram:hover { 
  background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045);
  border-color: transparent;
}
```

---

## SEO Architecture

### URL structure
```
/                                    → strona główna
/test/[slug]                         → karta testu (główna SEO jednostka)
/przepisy/[autor-slug]               → wszystkie testy danego autora
/przepisy/ania-gotuje                → SEO: kradnie ruch branded
/kategoria/[kat]                     → zupy, desery, etc.
/tag/[tag]                           → tagi
/sitemap.xml                         → auto-generated
```

### Schema markup per post
```json
{
  "@context": "https://schema.org",
  "@type": ["Review", "Article"],
  "headline": "...",
  "author": { "@type": "Person", "name": "Anna Kowalska" },
  "itemReviewed": {
    "@type": "Recipe",
    "name": "...",
    "author": { "@type": "Person/Organization", "name": "Ania Gotuje" },
    "url": "https://aniagotuje.pl/..."
  },
  "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
  "video": { "@type": "VideoObject", "embedUrl": "..." }
}
```

### Next.js metadata per post
```tsx
export async function generateMetadata({ params }) {
  return {
    title: `Testujemy: ${post.title} — Ania Rozgotuje`,
    description: post.seoDescription,
    openGraph: { images: [post.heroImage], type: 'article' },
    alternates: { canonical: `https://aniarozgotuje.pl/test/${params.slug}` }
  }
}
```

---

## Struktura katalogów (Next.js)

```
web/
├── app/
│   ├── layout.tsx              ← dark theme, fonts
│   ├── page.tsx                ← strona główna + hero
│   ├── test/
│   │   └── [slug]/
│   │       └── page.tsx        ← karta testu
│   ├── przepisy/
│   │   └── [autor]/
│   │       └── page.tsx
│   ├── kategoria/
│   │   └── [kat]/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/ ← Google OIDC
│       └── revalidate/         ← Sanity webhook
│
├── components/
│   ├── Hero/
│   ├── PostCard/
│   ├── PostPage/
│   │   ├── SourceBadge.tsx
│   │   ├── IngredientsList.tsx
│   │   ├── VideoEmbed.tsx
│   │   ├── PlatformIcons.tsx
│   │   ├── RatingsPanel.tsx
│   │   ├── FunnyRatings.tsx
│   │   ├── Gallery.tsx
│   │   ├── BehindScenes.tsx
│   │   └── ShareButtons.tsx
│   └── ui/                     ← reużywalne komponenty
│
├── lib/
│   ├── sanity.ts
│   ├── supabase.ts
│   └── auth.ts                 ← next-auth config
│
└── styles/
    ├── globals.css             ← dark theme base
    └── design-tokens.css
```

---

## Auth Flow (Google OIDC)

```
User → /login
  → Google OAuth consent
  → callback → next-auth
  → check Supabase: user_roles WHERE user_id = X
  → role = 'moderator' OR 'admin' → dashboard dostępny
  → role = null / 'user' → tylko czytanie (MVP1: brak rejestracji publicznej)

Dashboard (/admin):
  → middleware: getServerSession → check role
  → 403 jeśli nie moderator/admin
```

---

## Deployment

```
GitHub (Daemon-Penguins/aniarozgotuje.pl)
  ↓ push to main
Vercel (auto-deploy)
  ↓
aniarozgotuje.pl (produkcja)
  + Sanity Studio: studio.aniarozgotuje.pl
  + Supabase: managed PostgreSQL
```
