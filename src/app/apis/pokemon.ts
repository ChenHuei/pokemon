export type Pokemon = {
	name: string;
	sprites: {
		front_default: string;
	};
};
export type PokemonListResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: {
		name: string;
		url: string;
	}[];
};

export const QUERY_KEY = 'pokemonList';
export const LIMIT = 20;

export const fetchPokemonList = async (
	page: number = 0,
): Promise<Pokemon[]> => {
	try {
		const response: PokemonListResponse = await fetch(
			`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=${LIMIT}`,
		).then((res) => res.json());

		return Promise.all(
			response.results.map((item) => fetch(item.url).then((res) => res.json())),
		);
	} catch (error) {
		console.error('Failed to fetch Pokémon List', error);
		return [];
	}
};
