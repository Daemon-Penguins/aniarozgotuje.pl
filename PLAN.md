# PLAN.md — Ania Rozgotuje

> Kompletny plan projektu: portal + wideo + SEO + automatyzacja

---

## 🎯 Cel projektu

Stworzenie portalu recenzyjno-rozrywkowego testującego przepisy kulinarne z internetu (ze szczególnym uwzględnieniem popularnych serwisów jak Ania Gotuje), z silną strategią SEO, pełną automatyzacją pipeline'u wideo i cross-postingiem na YouTube, TikTok i Instagram.

---

## 📐 FAZA 0 — Fundament (Tydzień 1-2)

### 0.1 Branding

- [ ] Logo + identyfikacja wizualna "Ania Rozgotuje"
- [ ] Paleta kolorów, typografia
- [ ] Ton komunikacji: ciepły sarkazm, autentyczność, meme-friendly
- [ ] Tagline finalny

### 0.2 Domena i hosting

- [ ] Rejestracja domeny `aniarozgotuje.pl`
- [ ] Hosting: Vercel (Next.js) lub Cloudflare Pages
- [ ] CDN dla mediów: Cloudflare R2 lub Bunny.net

### 0.3 Wybór stacku

**Rekomendacja:**
- **Frontend:** Next.js 14 (App Router) — SEO-native, fast
- **CMS:** Sanity.io — elastyczny, dobry do kart recenzji
- **Baza:** Supabase (PostgreSQL) — do ocen, komentarzy, użytkowników
- **Wideo hosting:** Bunny.net Stream lub Mux — tańsze niż Vimeo
- **Deploy:** Vercel
- **Analytics:** PostHog + Google Search Console

---

## 📐 FAZA 1 — Portal webowy (Tydzień 3-6)

### 1.1 Strona główna

- [ ] Hero z najnowszymi testami
- [ ] Sekcja "Właśnie testujemy"
- [ ] Ranking przepisów (oceny)
- [ ] Filtry: autor oryginału, kategoria, wynik testu

### 1.2 Karta testu przepisu

Każdy test = osobna strona z:
- [ ] Nagłówek: *"Testujemy: [Nazwa przepisu] wg [Autor/Serwis]"*
- [ ] Wyraźny link do oryginału (SEO + legal)
- [ ] Ocena trudności (1-5)
- [ ] Wynik testu (udany/klapa/modyfikacja)
- [ ] Opis przebiegu (tekst + zdjęcia)
- [ ] Osadzony film (YouTube/TikTok/Reel)
- [ ] Sekcja komentarzy
- [ ] Schema markup: `Recipe` + `Review` + `VideoObject`

### 1.3 Strony SEO

- [ ] Strona autora: `aniarozgotuje.pl/przepisy/ania-gotuje`
- [ ] Strona kategorii: `aniarozgotuje.pl/kategoria/zupy`
- [ ] Strona tagu: `aniarozgotuje.pl/tag/15-minut`
- [ ] Sitemap XML automatyczny
- [ ] robots.txt

### 1.4 Profil Anny Kowalskiej

- [ ] Bio, zdjęcia, wideo intro
- [ ] "Dlaczego testuję przepisy"
- [ ] Social links

---

## 📐 FAZA 2 — SEO (od Dnia 1, ciągłe)

### 2.1 Strategia keyword

**Główne frazy do ataku:**
```
"ania gotuje [przepis]"           → review z naszego testu
"przepis na [danie] opinie"       → nasza karta testu
"czy przepis [danie] działa"      → content recenzyjny
"[przepis] krok po kroku błędy"   → long-tail
```

**Tytuły stron (format):**
- `Testujemy przepis Ani Gotuje na [danie] — czy warto? [Ania Rozgotuje]`
- `Przepis na [danie] z [serwis] — szczery test i ocena`

### 2.2 On-page SEO

- [ ] H1 zawiera keyword główny
- [ ] Meta description 155 znaków z CTA
- [ ] Alt texty zdjęć
- [ ] Internal linking między przepisami
- [ ] Breadcrumbs strukturalne

### 2.3 Schema markup (priorytet!)

Każda karta testu:
```json
{
  "@type": "Review",
  "itemReviewed": {
    "@type": "Recipe",
    "name": "[nazwa przepisu]",
    "author": { "@type": "Person", "name": "[autor oryginału]" },
    "url": "[link do oryginału]"
  },
  "reviewRating": { "@ratingValue": "4", "bestRating": "5" },
  "author": { "@type": "Person", "name": "Anna Kowalska" }
}
```

### 2.4 Content calendar

- **2 testy/tydzień** minimum (próg dla Google)
- Mix: popularne przepisy + niszowe + trending (TikTok food trends)
- Evergreen content: "Top 10 przepisów Ani Gotuje które testowałyśmy"

---

## 📐 FAZA 3 — Pipeline Wideo (Tydzień 4-8)

### 3.1 Schemat przepływu

```
NAGRANIE LIVE/VOD
        ↓
   [surowy plik .mp4]
        ↓
  ┌─────────────────┐
  │  OPUS CLIP / AI │  ← auto-wyciąganie najlepszych momentów
  └─────────────────┘
        ↓
  ┌─────────────────────────────────────┐
  │  POST-PRODUKCJA (szablony)          │
  │  - śmieszne wstawki (meme overlays) │
  │  - napisy automatyczne (Whisper)    │
  │  - intro/outro branded              │
  └─────────────────────────────────────┘
        ↓
  ┌──────────────────────────────────────┐
  │  AUTO-FORMAT                         │
  │  16:9 → YouTube długi film           │
  │  9:16 → YouTube Short / TikTok / Reel│
  │  1:1  → Instagram post               │
  └──────────────────────────────────────┘
        ↓
  ┌──────────────────────────┐
  │  AUTO-PUBLISH            │
  │  Make.com workflow       │
  │  + custom captions/tags  │
  └──────────────────────────┘
        ↓
  Embed na portal + artykuł SEO
```

### 3.2 Narzędzia pipeline

| Etap | Narzędzie | Koszt/mies |
|------|-----------|------------|
| AI clip extraction | Opus Clip | ~$29 |
| Napisy auto | Whisper (local/API) | ~$0-10 |
| Szablony/montaż | CapCut for Business | ~$15 |
| Meme overlays | własne szablony w Canva/CapCut | ~$0 |
| Auto-publish | Make.com (10k ops) | ~$9 |
| Wideo hosting | Bunny.net Stream | ~$10 |
| **Razem** | | **~$73/mies** |

### 3.3 Platformy docelowe

| Platforma | Format | Długość | Częstotliwość |
|-----------|--------|---------|---------------|
| YouTube | 16:9 | 8-20 min | 1/tydzień |
| YouTube Shorts | 9:16 | 15-60 sek | 3/tydzień |
| TikTok | 9:16 | 30-90 sek | 3-5/tydzień |
| Instagram Reel | 9:16 | 15-90 sek | 3/tydzień |
| Instagram Post | 1:1 | foto/kadr | 2/tydzień |

### 3.4 Cross-promo zasady

- YouTube Shorts → "pełna recenzja na kanale, link w bio"
- TikTok → "cały film na YouTube, link w profilu"
- Instagram → "test na YouTube + artykuł w bio link"
- Portal → embed wszystkich formatów + artykuł SEO

### 3.5 Meme/śmieszne wstawki (efekt książula)

Stała biblioteka overlayów:
- [ ] Reakcja "ALE SMRÓD" (z dymkiem)
- [ ] Licznik "minuta 47 i jeszcze surowe"
- [ ] Ocena końcowa w stylu retro (1-10 z dźwiękiem)
- [ ] "Przepis twierdził że 20 minut" overlay timera
- [ ] "To miało być łatwe" — stock photo compilation

---

## 📐 FAZA 4 — Legal & Compliance

### 4.1 Prawo autorskie — zasady

**Co NIE jest chronione prawem autorskim:**
- Lista składników (same nazwy)
- Temperatura pieczenia, czas gotowania
- Ogólne techniki gotowania

**Co JEST chronione:**
- Konkretna forma zapisu przepisu (tekst dosłowny)
- Zdjęcia z oryginalnej strony
- Nazwa autorska połączona z opisem

**Nasza ochrona:**
1. Zawsze podajemy źródło + link do oryginału
2. Nie kopiujemy tekstu — opisujemy własny przebieg testu
3. Film to nasza twórczość (nagranie, komentarz, opinia)
4. Format: recenzja/review — chroniony jako forma wyrazu

### 4.2 Stopka na każdej karcie testu

```
⚠️ Testowany przepis pochodzi z: [link do oryginału]
Autorem oryginalnego przepisu jest [imię/serwis].
Ten artykuł to niezależna recenzja z wykonania — nie kopia przepisu.
```

### 4.3 Polityki

- [ ] Regulamin portalu
- [ ] Polityka prywatności (RODO)
- [ ] Zasady recenzowania

---

## 📐 FAZA 5 — Monetyzacja (Miesiąc 3+)

- [ ] Google AdSense / Ezoic (display ads)
- [ ] YouTube Partner Program (1000 sub / 4000h)
- [ ] Afiliacja: linki do sprzętu (Ceneo/Amazon PL)
- [ ] Sponsoring odcinków (marki kuchenne)
- [ ] Merch (koszulka "Testowałam przepis i żałuję")

---

## ⏱️ Timeline

| Tydzień | Cel |
|---------|-----|
| 1-2 | Branding, domena, repo setup |
| 3-4 | MVP portalu (3-5 kart testów) |
| 5-6 | SEO on-page, schema markup |
| 7-8 | Pipeline wideo v1 |
| 9-10 | Pierwsze publikacje cross-platform |
| 12+ | Analiza, optymalizacja, skalowanie |

---

## 📊 KPIs (3 miesiące)

- [ ] 50+ kart testów
- [ ] Top 3 Google dla 10+ fraz "ania gotuje [przepis]"
- [ ] 1000+ subskrybentów YouTube
- [ ] 5000+ obserwujących TikTok
- [ ] 10 000+ UU/mies na portalu

---

*Aktualizacja: 2026-04-03 | Daemon-Penguins*
