'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import PokemonDetailContent from './components/Content';

const PokemonDetail = (props: { params: Promise<{ id: string }> }) => {
	const router = useRouter();
	const { id } = use(props.params);

	return (
		<PokemonDetailContent id={id}>
			<button
				className="p-4 border rounded-2xl capitalize cursor-pointer hover:opacity-80 transition-opacity duration-300"
				onClick={() => router.back()}>
				back to list
			</button>
		</PokemonDetailContent>
	);
};

export default PokemonDetail;
