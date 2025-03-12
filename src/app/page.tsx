'use client';

import Image from 'next/image';
import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList, QUERY_KEY } from './apis/pokemon';

export default function Home() {
	const observer = useRef<IntersectionObserver | null>(null);

	const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: [QUERY_KEY],
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
			<h1 className="w-full my-8 text-center text-4xl">Pokémon</h1>
			<div className="grid grid-cols-3 gap-4 px-4">
				{pokemonList.map(({ name, sprites: { front_default: url } }, i) => (
					<div
						key={name}
						ref={i === pokemonList.length - 1 ? lastElementRef : null}
						className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity duration-300">
						<Image src={url} alt={name} width={100} height={100} />
						<p>{name}</p>
					</div>
				))}
			</div>
			{isFetchingNextPage && (
				<div className="w-full my-8 text-center text-xl">Loading...</div>
			)}
		</div>
	);
}
