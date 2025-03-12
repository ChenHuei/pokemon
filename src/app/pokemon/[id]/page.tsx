'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
	QUERY_KEY_POKEMON_DETAIL,
	fetchPokemonDetail,
} from '@/app/apis/pokemon';
import Title from '@/app/components/Title';

const PokemonDetail = () => {
	const router = useRouter();
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
			<Title>
				#{`${data.id}`.padStart(4, '0')} - {data.name}
			</Title>
			<Image
				src={data.sprites.front_default}
				alt={data.name}
				height={200}
				width={200}
			/>
			<button
				className="p-4 border rounded-2xl cursor-pointer hover:opacity-80 transition-opacity duration-300"
				onClick={() => router.back()}>
				back to list
			</button>
		</div>
	);
};

export default PokemonDetail;
