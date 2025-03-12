import { z } from 'zod';

// 定義 Pokemon Schema
export const PokemonSchema = z.object({
	name: z.string(),
	id: z.number(),
	sprites: z.object({
		front_default: z.string().url(),
	}),
});

export const PokemonListResponseSchema = z.object({
	count: z.number(),
	next: z.string().nullable(),
	previous: z.string().nullable(),
	results: z.array(
		z.object({
			name: z.string(),
			url: z.string().url(),
		}),
	),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
export type PokemonListResponse = z.infer<typeof PokemonListResponseSchema>;

export const QUERY_KEY_POKEMON_LIST = 'pokemonList';
export const LIMIT = 20;

export const fetchPokemonList = async (
	page: number = 0,
): Promise<Pokemon[]> => {
	try {
		const response: PokemonListResponse = await fetch(
			`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${LIMIT}`,
		).then((res) => res.json());

		const parsedResponse = PokemonListResponseSchema.safeParse(response);
		if (!parsedResponse.success) {
			console.error('Invalid Pokémon List Response', parsedResponse.error);
			return [];
		}

		const data = await Promise.all(
			parsedResponse.data.results.map(async ({ url }) => {
				const pokemon: Pokemon = await fetch(url).then((res) => res.json());

				const parsedPokemon = PokemonSchema.safeParse(pokemon);
				if (parsedPokemon.success) {
					return parsedPokemon.data;
				} else {
					console.error('Invalid Pokémon Data', parsedPokemon.error);
					return null;
				}
			}),
		);

		return data.filter((p) => p !== null);
	} catch (error) {
		console.error('Failed to fetch Pokémon List', error);
		return [];
	}
};

export const QUERY_KEY_POKEMON_DETAIL = 'pokemonDetail';
export const fetchPokemonDetail = async (
	id: number | string,
): Promise<Pokemon | null> => {
	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${id}`,
		).then((res) => res.json());

		const parsed = PokemonSchema.safeParse(response);
		if (!parsed.success) {
			console.error('Invalid Pokémon Detail Response', parsed.error);
			return null;
		}

		return parsed.data;
	} catch (error) {
		console.error('Failed to fetch Pokémon Detail', error);
		return null;
	}
};
