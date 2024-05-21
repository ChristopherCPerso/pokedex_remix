import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function toggleFavorite(userId: number, pokemonId: number) {
  const pokemon = await prisma.user_favorites.findFirst({
    where: {
      user_id: userId,
      pokemon_id: pokemonId,
    },
  });

  if (pokemon) {
    await prisma.user_favorites.delete({
      where: {
        id: pokemon.id,
      },
    });
  } else {
    await prisma.user_favorites.create({
      data: {
        user_id: userId,
        pokemon_id: pokemonId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }
}

export async function getPokemonsFavorites(userId: number) {
  const pokemon = await prisma.user_favorites.findMany({
    where: {
      user_id: userId,
    },
  });
  return pokemon;
}
