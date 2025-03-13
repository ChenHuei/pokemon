import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	resolvedTheme: 'light' | 'dark';
	initializeTheme: () => void; // ✅ 初始化時應用主題
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
			resolvedTheme: 'light', // 預設為 light
			initializeTheme: () => {
				const savedTheme = get().theme; // 從 `zustand persist` 讀取
				const systemIsDark = window.matchMedia(
					'(prefers-color-scheme: dark)',
				).matches;

				// ✅ 確保 `resolvedTheme` 正確
				set({ resolvedTheme: systemIsDark ? 'dark' : 'light' });

				// ✅ 立即設定 HTML `class`
				document.documentElement.classList.remove('light', 'dark');
				document.documentElement.classList.add(
					savedTheme === 'system'
						? systemIsDark
							? 'dark'
							: 'light'
						: savedTheme,
				);
			},
		}),
		{
			name: 'theme', // ✅ localStorage key 名稱
		},
	),
);
