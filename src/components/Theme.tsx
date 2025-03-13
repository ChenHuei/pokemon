'use client';
import { useThemeStore } from '@/stores/useThemeStore';
import { useEffect } from 'react';

const COMMON_CLASS =
	'p-2 rounded cursor-pointer hover:opacity-80 transition-opacity duration-300';
const Theme = () => {
	const { theme, setTheme, initializeTheme } = useThemeStore();

	useEffect(() => {
		initializeTheme(); // ✅ 在應用啟動時立即設定 `dark` / `light`
	}, [initializeTheme]);

	return (
		<div className="flex gap-2">
			<button
				className={`${COMMON_CLASS} ${theme === 'light' ? 'bg-gray-300' : ''}`}
				onClick={() => setTheme('light')}>
				☀️ Light
			</button>
			<button
				className={`${COMMON_CLASS} ${
					theme === 'dark' ? 'bg-gray-800 text-white' : ''
				}`}
				onClick={() => setTheme('dark')}>
				🌙 Dark
			</button>
			<button
				className={`${COMMON_CLASS} ${
					theme === 'system' ? 'bg-blue-500 text-white' : ''
				}`}
				onClick={() => setTheme('system')}>
				🖥 System
			</button>
		</div>
	);
};

export default Theme;
