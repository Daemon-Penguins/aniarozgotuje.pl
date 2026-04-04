<?php

namespace App\Repository;

use App\Entity\RecipeReview;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class RecipeReviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RecipeReview::class);
    }

    public function findPublished(int $page = 1, int $limit = 12): array
    {
        $qb = $this->createQueryBuilder('r')
            ->andWhere('r.published = :pub')
            ->setParameter('pub', true)
            ->orderBy('r.publishedAt', 'DESC')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit);

        $total = $this->createQueryBuilder('r')
            ->select('COUNT(r.id)')
            ->andWhere('r.published = :pub')
            ->setParameter('pub', true)
            ->getQuery()
            ->getSingleScalarResult();

        return [
            'items' => $qb->getQuery()->getResult(),
            'total' => (int) $total,
        ];
    }

    public function findByTag(string $tag, int $page = 1, int $limit = 12): array
    {
        // MySQL JSON_CONTAINS dla tagów
        return $this->createQueryBuilder('r')
            ->andWhere('r.published = true')
            ->andWhere("JSON_CONTAINS(r.tags, :tag) = 1")
            ->setParameter('tag', json_encode($tag))
            ->orderBy('r.publishedAt', 'DESC')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }
}
