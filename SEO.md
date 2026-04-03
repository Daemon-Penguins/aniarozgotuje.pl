# SEO.md — Strategia pozycjonowania

## Główny cel

Przechwycenie ruchu z fraz związanych z "Ania Gotuje" i generycznych fraz recenzyjnych.

## Target keywords

| Fraza | Intencja | Trudność |
|-------|----------|----------|
| `ania gotuje [przepis]` | brand + nawigacyjna | średnia |
| `przepis [danie] opinie` | informacyjna | niska |
| `czy przepis [danie] działa` | recenzja | niska |
| `[danie] krok po kroku` | how-to | wysoka |
| `[danie] przepis szybki` | transakcyjna | wysoka |

## Format tytułów

```
Testujemy przepis Ani Gotuje na [danie] — czy warto? [Ania Rozgotuje]
Przepis [serwis] na [danie] — szczery test i recenzja
[Danie] w 20 minut? Sprawdzamy czy to możliwe
```

## Schema markup (priorytet)

- `Recipe` — dla karty każdego testu
- `Review` — ocena przepisu
- `VideoObject` — dla osadzonego wideo
- `BreadcrumbList` — nawigacja

## Content calendar minimum

- 2 pełne testy tygodniowo
- 1 artykuł evergreen miesięcznie ("Top 10 przepisów które testowałyśmy")
- Reagowanie na trending food TikTok

## Techniczne SEO

- [ ] Next.js SSR/SSG — pre-render dla Googlebot
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1
- [ ] Sitemap XML automatyczny
- [ ] robots.txt
- [ ] Open Graph + Twitter Cards
- [ ] Canonical URL na każdej stronie
