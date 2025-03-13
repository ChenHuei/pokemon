import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	images: {
		domains: ['raw.githubusercontent.com', 'pokeapi.co'],
	},
	/* config options here */
};

export default nextConfig;
