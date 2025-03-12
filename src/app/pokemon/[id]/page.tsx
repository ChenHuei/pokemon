'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
	QUERY_KEY_POKEMON_DETAIL,
	fetchPokemonDetail,
} from '@/app/apis/pokemon';
import Title from '@/app/components/Title';

const PokemonDetail = () => {
	const params = useParams<{ id: string }>();

	const { data, isLoading, isError } = useQuery({
		queryKey: [QUERY_KEY_POKEMON_DETAIL, params.id],
		queryFn: () => fetchPokemonDetail(params.id),
		enabled: Boolean(params.id),
	});

	if (isLoading) return <Title>Loading...</Title>;
	if (isError || !data)
		return <Title className="text-red-500">無法獲取數據</Title>;

	return (
		<div className="grid grid-cols-1 gap-4 p-4">
			<Image
				src={data.sprites.front_default}
				alt={data.name}
				height={200}
				width={200}
			/>
		</div>
	);
};

export default PokemonDetail;
