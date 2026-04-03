# PIPELINE.md — Automatyzacja wideo

## Schemat przepływu

```
NAGRANIE (live stream lub nagranie lokalne)
        ↓
   surowy .mp4 → upload do folderu roboczego
        ↓
[OPUS CLIP] — AI wyciąga 5-10 najlepszych momentów (auto)
        ↓
[WHISPER] — auto napisy (polski)
        ↓
[CapCut / szablony] — meme overlaye, intro, outro
        ↓
   ┌────────────────────────────────────┐
   │  Format export                     │
   │  16:9 → YouTube pełny film         │
   │  9:16 → YouTube Short/TikTok/Reel  │
   │  1:1  → Instagram post             │
   └────────────────────────────────────┘
        ↓
[MAKE.COM workflow]
   ├─→ YouTube upload (tytuł, opis, tagi, thumbnail)
   ├─→ TikTok upload (opis, hashtagi)
   ├─→ Instagram Reel (caption)
   └─→ Portal: trigger nowy artykuł w CMS (Sanity webhook)
        ↓
   Artykuł SEO z embed wideo → publikacja
```

## Narzędzia

| Narzędzie | Rola | Koszt/mies |
|-----------|------|------------|
| Opus Clip | AI clip extraction | ~$29 |
| Whisper | Auto napisy | ~$0-10 |
| CapCut Business | Montaż + szablony | ~$15 |
| Make.com | Automatyzacja publish | ~$9 |
| Bunny.net Stream | Hosting wideo | ~$10 |
| **Razem** | | **~$73** |

## Meme overlaye — biblioteka

Gotowe szablony do przygotowania:
- "ALE SMRÓD" (dymek z reakcją)
- Licznik "minuta X i jeszcze surowe"
- Retro ocena 1-10 (z dźwiękiem)
- "Przepis twierdził że 20 minut" (timer overlay)
- "To miało być łatwe" (stock photo fail)
- Zoom-in na twarz z napisem reakcji

## Cross-promo zasady

| Z | Na | CTA |
|---|----|-----|
| YouTube Short | YouTube long | "pełna recenzja na kanale ↑" |
| TikTok | YouTube | "cały film na YouTube, link w bio" |
| Instagram Reel | Portal | "artykuł + recenzja w bio link" |
| Portal | Wszystkie | embed + linki do profili |

## Frekwencja publikacji

| Platforma | Ilość/tydzień |
|-----------|---------------|
| YouTube (długi) | 1 |
| YouTube Shorts | 3 |
| TikTok | 3-5 |
| Instagram Reel | 3 |
| Portal (artykuł) | 2 |

## TODO setup

- [ ] Konto Opus Clip + połączenie z YouTube
- [ ] Make.com scenariusz: YouTube → TikTok → IG → CMS
- [ ] Szablony CapCut (branded intro/outro)
- [ ] Whisper setup (local lub API)
- [ ] Bunny.net stream bucket
