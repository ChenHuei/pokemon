'use client';

import { use } from 'react';
import Modal from '@/components/Modal';
import PokemonDetailContent from '@/app/pokemon/[id]/components/Content';

export default function PokemonModal(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(props.params);
	return (
		<Modal>
			<PokemonDetailContent id={id} />
		</Modal>
	);
}
