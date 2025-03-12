'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList, QUERY_KEY_POKEMON_LIST } from '@/app/apis/pokemon';
import Title from '@/app/components/Title';
import Link from 'next/link';

export default function Home() {
	const observer = useRef<IntersectionObserver | null>(null);

	const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: [QUERY_KEY_POKEMON_LIST],
			queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam),
			initialPageParam: 0,
			getNextPageParam: (lastPage, allPages) =>
				lastPage.length ? allPages.length * 20 : undefined,
		});

	const lastElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node || !hasNextPage || isFetchingNextPage) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting) fetchNextPage();
			});
			observer.current.observe(node);
		},
		[fetchNextPage, hasNextPage, isFetchingNextPage],
	);
	const pokemonList = data?.pages.flat() ?? [];

	return (
		<div>
			<Title>Pokémon</Title>
			<div className="grid grid-cols-3 gap-4 px-4">
				{pokemonList.map(({ name, id, sprites: { front_default: url } }, i) => (
					<Link key={name} href={`/pokemon/${id}`}>
						<div
							ref={i === pokemonList.length - 1 ? lastElementRef : null}
							className="flex flex-col items-center capitalize cursor-pointer hover:opacity-80 transition-opacity duration-300">
							<Image src={url} alt={name} width={100} height={100} />
							<p>{name}</p>
						</div>
					</Link>
				))}
			</div>
			{isFetchingNextPage && <Title className="text-xl">Loading...</Title>}
		</div>
	);
}
