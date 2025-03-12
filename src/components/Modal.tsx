'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Modal = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const dialogRef = useRef<React.ElementRef<'dialog'>>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (dialog && !dialog.open) {
			dialog.showModal();
		}
	}, []);

	const onDismiss = () => {
		router.back();
	};

	const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
		const dialog = dialogRef.current;
		if (dialog && event.target === dialog) {
			onDismiss();
		}
	};

	return (
		<div className="fixed inset-0 bg-background/80 z-50">
			<dialog
				ref={dialogRef}
				className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 max-w-[500px] h-auto max-h-[500px] p-4 flex justify-center items-center bg-foreground text-4xl font-medium rounded-xl"
				onClose={onDismiss}
				onClick={handleBackdropClick}>
				{children}
				<button
					className="absolute top-[10px] right-[10px] w-12 h-12 bg-transparent border-none rounded-[15px] flex items-center justify-center font-medium text-2xl cursor-pointer hover:bg-gray-200"
					onClick={onDismiss}>
					✕
				</button>
			</dialog>
		</div>
	);
};
export default Modal;
