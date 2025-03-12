import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY_POKEMON_DETAIL, fetchPokemonDetail } from '@/apis/pokemon';
import Title from '@/components/Title';

const PokemonDetailContent = ({
	id,
	children,
}: Readonly<{ id: string; children?: React.ReactNode }>) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: [QUERY_KEY_POKEMON_DETAIL, id],
		queryFn: () => fetchPokemonDetail(id),
		enabled: Boolean(id),
	});

	if (isLoading) return <Title>Loading...</Title>;
	if (isError || !data)
		return <Title className="text-red-500">無法獲取數據</Title>;

	return (
		<div className="grid grid-cols-1 gap-4 p-4">
			<article className="flex flex-col items-center justify-center">
				<Title>
					#{`${data.id}`.padStart(4, '0')} - {data.name}
				</Title>
				<Image
					src={data.sprites.front_default}
					alt={data.name}
					height={200}
					width={200}
				/>
			</article>
			{children}
		</div>
	);
};

export default PokemonDetailContent;
