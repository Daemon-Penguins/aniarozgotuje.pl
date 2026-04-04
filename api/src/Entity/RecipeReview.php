<?php

namespace App\Entity;

use App\Repository\RecipeReviewRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

/**
 * Karta testu przepisu — główna encja portalu.
 */
#[ORM\Entity(repositoryClass: RecipeReviewRepository::class)]
#[ORM\Table(name: 'recipe_reviews')]
#[ORM\HasLifecycleCallbacks]
class RecipeReview
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    // ─── SEO ──────────────────────────────────────────────────────────────
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $slug = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $seoTitle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $seoDescription = null;

    // ─── Źródło przepisu ──────────────────────────────────────────────────
    #[ORM\Column(length: 255)]
    private ?string $originalTitle = null;

    #[ORM\Column(length: 500)]
    private ?string $originalUrl = null;

    #[ORM\Column(length: 255)]
    private ?string $originalAuthor = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $testedOn = null;

    // ─── Treść ────────────────────────────────────────────────────────────
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $body = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $ingredients = null;

    // ─── Media ────────────────────────────────────────────────────────────
    #[ORM\Column(length: 500, nullable: true)]
    private ?string $heroImageUrl = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $youtubeUrl = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $youtubeShortUrl = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $tiktokUrl = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $instagramReelUrl = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $gallery = null;

    // ─── Oceny ────────────────────────────────────────────────────────────
    #[ORM\Column(nullable: true)]
    private ?int $ratingDifficulty = null;    // 1-5

    #[ORM\Column(nullable: true)]
    private ?int $ratingTaste = null;         // 1-5

    #[ORM\Column(nullable: true)]
    private ?int $ratingQuality = null;       // 1-5

    #[ORM\Column(nullable: true)]
    private ?int $ratingTime = null;          // 1-5 (zgodność czasu)

    #[ORM\Column(nullable: true)]
    private ?int $ratingAvailability = null;  // 1-5 (dostępność składników)

    // Śmieszne oceny
    #[ORM\Column(nullable: true)]
    private ?int $funnyInstagram = null;      // 1-5 instagramowalność

    #[ORM\Column(nullable: true)]
    private ?int $funnyStressLevel = null;    // 1-5 poziom stresu

    #[ORM\Column(nullable: true)]
    private ?int $funnyDishesDestroyed = null; // 0-∞

    #[ORM\Column(nullable: true)]
    private ?int $funnyFamilyReaction = null;  // 1-5

    #[ORM\Column(type: Types::BOOLEAN, nullable: true)]
    private ?bool $funnyAniaApproved = null;   // czy Ania by zaakceptowała

    // ─── Behind the scenes ────────────────────────────────────────────────
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $behindScenes = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $behindScenesGallery = null;

    // ─── Publikacja ───────────────────────────────────────────────────────
    #[ORM\Column(type: Types::BOOLEAN)]
    private bool $published = false;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $publishedAt = null;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column]
    private \DateTimeImmutable $updatedAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $author = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    private ?array $tags = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function onUpdate(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    // ─── Gettery / Settery ────────────────────────────────────────────────
    public function getId(): ?Uuid { return $this->id; }
    public function getTitle(): ?string { return $this->title; }
    public function setTitle(string $title): static { $this->title = $title; return $this; }
    public function getSlug(): ?string { return $this->slug; }
    public function setSlug(string $slug): static { $this->slug = $slug; return $this; }
    public function getSeoTitle(): ?string { return $this->seoTitle; }
    public function setSeoTitle(?string $v): static { $this->seoTitle = $v; return $this; }
    public function getSeoDescription(): ?string { return $this->seoDescription; }
    public function setSeoDescription(?string $v): static { $this->seoDescription = $v; return $this; }
    public function getOriginalTitle(): ?string { return $this->originalTitle; }
    public function setOriginalTitle(string $v): static { $this->originalTitle = $v; return $this; }
    public function getOriginalUrl(): ?string { return $this->originalUrl; }
    public function setOriginalUrl(string $v): static { $this->originalUrl = $v; return $this; }
    public function getOriginalAuthor(): ?string { return $this->originalAuthor; }
    public function setOriginalAuthor(string $v): static { $this->originalAuthor = $v; return $this; }
    public function getTestedOn(): ?\DateTimeImmutable { return $this->testedOn; }
    public function setTestedOn(?\DateTimeImmutable $v): static { $this->testedOn = $v; return $this; }
    public function getBody(): ?string { return $this->body; }
    public function setBody(?string $v): static { $this->body = $v; return $this; }
    public function getIngredients(): ?array { return $this->ingredients; }
    public function setIngredients(?array $v): static { $this->ingredients = $v; return $this; }
    public function getHeroImageUrl(): ?string { return $this->heroImageUrl; }
    public function setHeroImageUrl(?string $v): static { $this->heroImageUrl = $v; return $this; }
    public function getYoutubeUrl(): ?string { return $this->youtubeUrl; }
    public function setYoutubeUrl(?string $v): static { $this->youtubeUrl = $v; return $this; }
    public function getYoutubeShortUrl(): ?string { return $this->youtubeShortUrl; }
    public function setYoutubeShortUrl(?string $v): static { $this->youtubeShortUrl = $v; return $this; }
    public function getTiktokUrl(): ?string { return $this->tiktokUrl; }
    public function setTiktokUrl(?string $v): static { $this->tiktokUrl = $v; return $this; }
    public function getInstagramReelUrl(): ?string { return $this->instagramReelUrl; }
    public function setInstagramReelUrl(?string $v): static { $this->instagramReelUrl = $v; return $this; }
    public function getGallery(): ?array { return $this->gallery; }
    public function setGallery(?array $v): static { $this->gallery = $v; return $this; }
    public function getRatingDifficulty(): ?int { return $this->ratingDifficulty; }
    public function setRatingDifficulty(?int $v): static { $this->ratingDifficulty = $v; return $this; }
    public function getRatingTaste(): ?int { return $this->ratingTaste; }
    public function setRatingTaste(?int $v): static { $this->ratingTaste = $v; return $this; }
    public function getRatingQuality(): ?int { return $this->ratingQuality; }
    public function setRatingQuality(?int $v): static { $this->ratingQuality = $v; return $this; }
    public function getRatingTime(): ?int { return $this->ratingTime; }
    public function setRatingTime(?int $v): static { $this->ratingTime = $v; return $this; }
    public function getRatingAvailability(): ?int { return $this->ratingAvailability; }
    public function setRatingAvailability(?int $v): static { $this->ratingAvailability = $v; return $this; }
    public function getFunnyInstagram(): ?int { return $this->funnyInstagram; }
    public function setFunnyInstagram(?int $v): static { $this->funnyInstagram = $v; return $this; }
    public function getFunnyStressLevel(): ?int { return $this->funnyStressLevel; }
    public function setFunnyStressLevel(?int $v): static { $this->funnyStressLevel = $v; return $this; }
    public function getFunnyDishesDestroyed(): ?int { return $this->funnyDishesDestroyed; }
    public function setFunnyDishesDestroyed(?int $v): static { $this->funnyDishesDestroyed = $v; return $this; }
    public function getFunnyFamilyReaction(): ?int { return $this->funnyFamilyReaction; }
    public function setFunnyFamilyReaction(?int $v): static { $this->funnyFamilyReaction = $v; return $this; }
    public function getFunnyAniaApproved(): ?bool { return $this->funnyAniaApproved; }
    public function setFunnyAniaApproved(?bool $v): static { $this->funnyAniaApproved = $v; return $this; }
    public function getBehindScenes(): ?string { return $this->behindScenes; }
    public function setBehindScenes(?string $v): static { $this->behindScenes = $v; return $this; }
    public function getBehindScenesGallery(): ?array { return $this->behindScenesGallery; }
    public function setBehindScenesGallery(?array $v): static { $this->behindScenesGallery = $v; return $this; }
    public function isPublished(): bool { return $this->published; }
    public function setPublished(bool $v): static { $this->published = $v; return $this; }
    public function getPublishedAt(): ?\DateTimeImmutable { return $this->publishedAt; }
    public function setPublishedAt(?\DateTimeImmutable $v): static { $this->publishedAt = $v; return $this; }
    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
    public function getUpdatedAt(): \DateTimeImmutable { return $this->updatedAt; }
    public function getAuthor(): ?User { return $this->author; }
    public function setAuthor(?User $v): static { $this->author = $v; return $this; }
    public function getTags(): ?array { return $this->tags; }
    public function setTags(?array $v): static { $this->tags = $v; return $this; }
}
