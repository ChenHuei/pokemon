import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resolvedTheme: 'light' | 'dark';
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			theme: 'system', // 預設為 system 模式
			setTheme: (theme) => {
				set({ theme });

				// 更新 HTML `class` 來適應 TailwindCSS dark mode
				document.documentElement.classList.remove('light', 'dark');
				document.documentElement.classList.add(
					theme === 'system' ? get().resolvedTheme : theme,
				);
			},

			resolvedTheme:
				typeof window !== 'undefined'
					? window.matchMedia('(prefers-color-scheme: dark)').matches
						? 'dark'
						: 'light'
					: 'light', // 預設為 light
		}),
		{
			name: 'theme', // ✅ localStorage key 名稱
		},
	),
);
