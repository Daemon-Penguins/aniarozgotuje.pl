<?php

namespace App\Controller\Api;

use App\Entity\RecipeReview;
use App\Repository\RecipeReviewRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/reviews', name: 'api_reviews_')]
class ReviewController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private RecipeReviewRepository $repo,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator,
    ) {}

    // ─── GET /api/reviews ─────────────────────────────────────────────────
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $page  = max(1, (int) $request->query->get('page', 1));
        $limit = min(50, max(1, (int) $request->query->get('limit', 12)));

        $reviews = $this->repo->findPublished($page, $limit);

        return $this->json([
            'data'  => $reviews['items'],
            'total' => $reviews['total'],
            'page'  => $page,
            'limit' => $limit,
        ], context: ['groups' => ['review:list']]);
    }

    // ─── GET /api/reviews/{slug} ──────────────────────────────────────────
    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(string $slug): JsonResponse
    {
        $review = $this->repo->findOneBy(['slug' => $slug, 'published' => true]);

        if (!$review) {
            return $this->json(['error' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($review, context: ['groups' => ['review:detail']]);
    }

    // ─── POST /api/reviews ────────────────────────────────────────────────
    #[Route('', name: 'create', methods: ['POST'])]
    #[IsGranted('ROLE_MODERATOR')]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $review = new RecipeReview();
        $review->setAuthor($this->getUser());
        $this->hydrate($review, $data);

        $errors = $this->validator->validate($review);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->em->persist($review);
        $this->em->flush();

        return $this->json($review, Response::HTTP_CREATED, context: ['groups' => ['review:detail']]);
    }

    // ─── PUT /api/reviews/{id} ────────────────────────────────────────────
    #[Route('/{id}', name: 'update', methods: ['PUT', 'PATCH'])]
    #[IsGranted('ROLE_MODERATOR')]
    public function update(string $id, Request $request): JsonResponse
    {
        $review = $this->repo->find($id);

        if (!$review) {
            return $this->json(['error' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true) ?? [];
        $this->hydrate($review, $data);
        $this->em->flush();

        return $this->json($review, context: ['groups' => ['review:detail']]);
    }

    // ─── DELETE /api/reviews/{id} ─────────────────────────────────────────
    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(string $id): JsonResponse
    {
        $review = $this->repo->find($id);

        if (!$review) {
            return $this->json(['error' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        $this->em->remove($review);
        $this->em->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    // ─── Hydration helper ─────────────────────────────────────────────────
    private function hydrate(RecipeReview $review, array $data): void
    {
        isset($data['title'])            && $review->setTitle($data['title']);
        isset($data['slug'])             && $review->setSlug($data['slug']);
        isset($data['seoTitle'])         && $review->setSeoTitle($data['seoTitle']);
        isset($data['seoDescription'])   && $review->setSeoDescription($data['seoDescription']);
        isset($data['originalTitle'])    && $review->setOriginalTitle($data['originalTitle']);
        isset($data['originalUrl'])      && $review->setOriginalUrl($data['originalUrl']);
        isset($data['originalAuthor'])   && $review->setOriginalAuthor($data['originalAuthor']);
        isset($data['body'])             && $review->setBody($data['body']);
        isset($data['ingredients'])      && $review->setIngredients($data['ingredients']);
        isset($data['heroImageUrl'])     && $review->setHeroImageUrl($data['heroImageUrl']);
        isset($data['youtubeUrl'])       && $review->setYoutubeUrl($data['youtubeUrl']);
        isset($data['youtubeShortUrl'])  && $review->setYoutubeShortUrl($data['youtubeShortUrl']);
        isset($data['tiktokUrl'])        && $review->setTiktokUrl($data['tiktokUrl']);
        isset($data['instagramReelUrl']) && $review->setInstagramReelUrl($data['instagramReelUrl']);
        isset($data['gallery'])          && $review->setGallery($data['gallery']);
        isset($data['tags'])             && $review->setTags($data['tags']);
        isset($data['published'])        && $review->setPublished((bool) $data['published']);

        if (isset($data['published']) && $data['published'] && !$review->getPublishedAt()) {
            $review->setPublishedAt(new \DateTimeImmutable());
        }

        // Oceny obiektywne
        isset($data['ratingDifficulty'])   && $review->setRatingDifficulty((int) $data['ratingDifficulty']);
        isset($data['ratingTaste'])        && $review->setRatingTaste((int) $data['ratingTaste']);
        isset($data['ratingQuality'])      && $review->setRatingQuality((int) $data['ratingQuality']);
        isset($data['ratingTime'])         && $review->setRatingTime((int) $data['ratingTime']);
        isset($data['ratingAvailability']) && $review->setRatingAvailability((int) $data['ratingAvailability']);

        // Oceny śmieszne
        isset($data['funnyInstagram'])      && $review->setFunnyInstagram((int) $data['funnyInstagram']);
        isset($data['funnyStressLevel'])    && $review->setFunnyStressLevel((int) $data['funnyStressLevel']);
        isset($data['funnyDishesDestroyed']) && $review->setFunnyDishesDestroyed((int) $data['funnyDishesDestroyed']);
        isset($data['funnyFamilyReaction']) && $review->setFunnyFamilyReaction((int) $data['funnyFamilyReaction']);
        isset($data['funnyAniaApproved'])   && $review->setFunnyAniaApproved((bool) $data['funnyAniaApproved']);

        // Behind the scenes
        isset($data['behindScenes'])        && $review->setBehindScenes($data['behindScenes']);
        isset($data['behindScenesGallery']) && $review->setBehindScenesGallery($data['behindScenesGallery']);
    }
}
