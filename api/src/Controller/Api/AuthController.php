<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Auth endpoints — JWT login obsługuje LexikJWTAuthenticationBundle
 * Ten kontroler tylko dokumentuje endpointy.
 */
#[Route('/api/auth', name: 'api_auth_')]
class AuthController extends AbstractController
{
    // POST /api/auth/login → obsługiwane przez LexikJWT (firewall: login)
    // Zwraca: { "token": "eyJ..." }

    #[Route('/me', name: 'me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Not authenticated'], 401);
        }

        return $this->json([
            'id'          => (string) $user->getId(),
            'email'       => $user->getEmail(),
            'displayName' => $user->getDisplayName(),
            'roles'       => $user->getRoles(),
        ]);
    }
}
