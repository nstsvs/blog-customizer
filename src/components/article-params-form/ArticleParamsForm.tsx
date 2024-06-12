import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const formRef = useRef<HTMLDivElement>(null);

	// закрытие сайдбара по клику вне его области
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			// проверяем, произошел ли клик вне сайдбара
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				handleClick={() => {
					setOpen(!isOpen);
				}}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
