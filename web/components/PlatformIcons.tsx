interface Media {
  youtubeUrl: string | null;
  youtubeShortUrl: string | null;
  tiktokUrl: string | null;
  instagramReelUrl: string | null;
}

export function PlatformIcons({ media }: { media: Media }) {
  const platforms = [
    { label: "YouTube", url: media.youtubeUrl, icon: "▶" },
    { label: "YT Short", url: media.youtubeShortUrl, icon: "⚡" },
    { label: "TikTok", url: media.tiktokUrl, icon: "♪" },
    { label: "Instagram", url: media.instagramReelUrl, icon: "◉" },
  ].filter((p) => p.url);

  if (!platforms.length) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {platforms.map(({ label, url, icon }) => (
        <a
          key={label}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          className="platform-link"
        >
          <span>{icon}</span>
          {label}
        </a>
      ))}
    </div>
  );
}
