import { useEffect } from 'react';

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		// останавливаем действие эффекта, если закрыто
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				// проверяем, что это `DOM`-элемент
				target instanceof Node &&
				rootRef.current &&
				// проверяем, что кликнули на элемент, который находится не внутри нашего блока
				!rootRef.current.contains(target);
			if (isOutsideClick) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		//  обязательно удаляем обработчики в `clean-up`- функции
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не при любой перерисовке компонента
	}, [isOpen, onClose, rootRef]);
}
