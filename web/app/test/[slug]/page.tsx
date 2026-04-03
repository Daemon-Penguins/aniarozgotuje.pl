import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/ShareButtons";
import { ObjectiveRatings, FunnyRatings } from "@/components/RatingsPanel";
import { BehindScenes } from "@/components/BehindScenes";
import { PlatformIcons } from "@/components/PlatformIcons";

/* ------------------------------------------------------------------ */
/* Mock data — replace with Sanity fetch                                */
/* ------------------------------------------------------------------ */

const POSTS: Record<string, MockPost> = {
  "placek-ziemniaczany": {
    slug: "placek-ziemniaczany",
    title: "Placek ziemniaczany — testujemy przepis Ani Gotuje",
    seoTitle: "Testujemy placek ziemniaczany z Ania Gotuje — Ania Rozgotuje",
    seoDescription:
      "Czy przepis na placek ziemniaczany z Ania Gotuje jest tak prosty jak obiecuje? Sprawdzamy czas, trudność i smak. Nasza ocena: 4/5.",
    publishedAt: "2024-01-15",
    source: {
      originalTitle: "Placek ziemniaczany — przepis",
      originalUrl: "#",
      originalAuthor: "Ania Gotuje",
    },
    ingredients: [
      { name: "ziemniaki", amount: "1 kg" },
      { name: "jajka", amount: "2 szt." },
      { name: "cebula", amount: "1 szt." },
      { name: "mąka pszenna", amount: "3 łyżki" },
      { name: "sól", amount: "1 łyżeczka" },
      { name: "pieprz", amount: "do smaku" },
      { name: "olej do smażenia", amount: "4 łyżki" },
    ],
    media: {
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      youtubeShortUrl: null,
      tiktokUrl: "https://tiktok.com/@aniagotuje",
      instagramReelUrl: null,
    },
    ratings: {
      objective: {
        czas: 3,
        trudnosc: 2,
        dostepnosc: 5,
        koszt: 5,
        powtarzalnosc: 4,
      },
      funny: {
        instagramowalnosc: 3,
        poziom_stresu: 2,
        ile_naczyn_zniszczyles: 3,
        reakcja_rodziny: 5,
        czy_ania_by_zaakceptowala: true,
      },
    },
    body: "Przepis wydaje się banalnie prosty na pierwszy rzut oka — ziemniaki, jajka, cebula. Nic skomplikowanego. Ale diabeł tkwi w szczegółach. Pierwsze podejście: masa za mokra, placki rozpadają się na patelni. Ania Gotuje mówi, żeby dobrze odcisnąć wodę z ziemniaków — i ma rację, tylko nie mówi, że zajmuje to 10 minut intensywnego ściskania przez ściereczkę. Za to smak? Naprawdę dobry. Chrupiące z zewnątrz, miękkie w środku. Podaliśmy ze śmietaną i rodziną znikły w 5 minut.",
    behindScenes: {
      text: "Pierwsze podejście skończyło się przypalonym plackiem i zadymioną kuchnią. Okazało się, że ogień był za duży — Ania wspomina o 'średnim ogniu', ale co to znaczy na kuchence indukcyjnej? Drugie podejście: skalowałam na 6. Trzecie już wyszło perfekcyjnie. Protip: użyj ściereczki do sera, dużo lepiej odciąga wodę niż zwykła kuchenna.",
    },
    overallRating: 4,
  },
};

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

interface Ingredient {
  name: string;
  amount: string;
}

interface MockPost {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  source: {
    originalTitle: string;
    originalUrl: string;
    originalAuthor: string;
  };
  ingredients: Ingredient[];
  media: {
    youtubeUrl: string | null;
    youtubeShortUrl: string | null;
    tiktokUrl: string | null;
    instagramReelUrl: string | null;
  };
  ratings: {
    objective: {
      czas: number;
      trudnosc: number;
      dostepnosc: number;
      koszt: number;
      powtarzalnosc: number;
    };
    funny: {
      instagramowalnosc: number;
      poziom_stresu: number;
      ile_naczyn_zniszczyles: number;
      reakcja_rodziny: number;
      czy_ania_by_zaakceptowala: boolean;
    };
  };
  body: string;
  behindScenes: { text: string };
  overallRating: number;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return { title: "Nie znaleziono — Ania Rozgotuje" };
  }

  const siteUrl = "https://aniarozgotuje.pl";
  const canonicalUrl = `${siteUrl}/test/${slug}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      authors: ["Ania Rozgotuje"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                              */
/* ------------------------------------------------------------------ */

function JsonLd({ post }: { post: MockPost }) {
  const siteUrl = "https://aniarozgotuje.pl";
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Review", "Article"],
    headline: post.title,
    author: {
      "@type": "Organization",
      name: "Ania Rozgotuje",
      url: siteUrl,
    },
    datePublished: post.publishedAt,
    description: post.seoDescription,
    url: `${siteUrl}/test/${post.slug}`,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(post.overallRating),
      bestRating: "5",
      worstRating: "1",
    },
    itemReviewed: {
      "@type": "Recipe",
      name: post.source.originalTitle,
      author: {
        "@type": "Person",
        name: post.source.originalAuthor,
      },
      url: post.source.originalUrl,
    },
    ...(post.media.youtubeUrl && {
      video: {
        "@type": "VideoObject",
        embedUrl: post.media.youtubeUrl.replace("watch?v=", "embed/"),
        name: post.title,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) notFound();

  const siteUrl = "https://aniarozgotuje.pl";
  const postUrl = `${siteUrl}/test/${slug}`;

  return (
    <>
      <JsonLd post={post} />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "380px",
          background: "var(--bg-card)",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Image placeholder */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(244,160,181,0.08) 0%, transparent 70%)",
          }}
        >
          <span style={{ fontSize: "5rem", opacity: 0.3 }}>🥔</span>
        </div>

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.7) 50%, #0a0a0a 100%)",
          }}
        />

        {/* Hero text */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            width: "100%",
            margin: "0 auto",
            padding: "0 1.5rem 2.5rem",
          }}
        >
          {/* Source badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--accent-pink)",
              background: "rgba(244,160,181,0.1)",
              border: "1px solid rgba(244,160,181,0.25)",
              padding: "0.3rem 0.875rem",
              borderRadius: "2rem",
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              marginBottom: "1rem",
            }}
          >
            📍 Przepis z:{" "}
            <a
              href={post.source.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              {post.source.originalAuthor}
            </a>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1.2,
              maxWidth: "800px",
            }}
          >
            {post.title}
          </h1>

          <div style={{ marginTop: "1rem" }}>
            <PlatformIcons media={post.media} />
          </div>
        </div>
      </section>

      {/* Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2.5rem",
        }}
      >
        {/* Top section: ingredients + body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Ingredients */}
          <aside>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "1rem",
                padding: "1.75rem",
                position: "sticky",
                top: "5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--accent-mint)",
                  margin: "0 0 1.25rem",
                }}
              >
                🥘 Składniki
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                {post.ingredients.map((ing) => (
                  <li
                    key={ing.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "0.75rem",
                      paddingBottom: "0.625rem",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.9rem",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <span style={{ color: "var(--text-primary)" }}>
                      {ing.name}
                    </span>
                    <span
                      style={{
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                        fontSize: "0.8125rem",
                      }}
                    >
                      {ing.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body + video */}
          <article>
            {/* Article body */}
            <div
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-inter)",
                fontSize: "1.0625rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {post.body}
            </div>

            {/* Video embed placeholder */}
            {post.media.youtubeUrl && (
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>▶</span>
                <span>
                  <a
                    href={post.media.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent-pink)", textDecoration: "none" }}
                  >
                    Obejrzyj film na YouTube →
                  </a>
                </span>
              </div>
            )}
          </article>
        </div>

        {/* Ratings */}
        <section>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "white",
              marginBottom: "1.5rem",
            }}
          >
            Nasza ocena
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <ObjectiveRatings ratings={post.ratings.objective} />
            <FunnyRatings ratings={post.ratings.funny} />
          </div>
        </section>

        {/* Behind the scenes */}
        <section>
          <BehindScenes text={post.behindScenes.text} />
        </section>

        {/* Share */}
        <section
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <ShareButtons
            url={postUrl}
            title={post.title}
            tiktokUrl={post.media.tiktokUrl}
            instagramReelUrl={post.media.instagramReelUrl}
          />
        </section>
      </div>
    </>
  );
}
