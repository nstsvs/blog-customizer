import React, { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useClose } from 'components/article-params-form/hooks/useClose';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsProps = {
	params: ArticleStateType;
	onSubmit: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ params, onSubmit }: ArticleParamsProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(params);

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	const handleReset = () => {
		setFormState(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(formState);
		setIsOpen(false);
	};

	const handleSelectChange =
		(key: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prevState) => ({
				...prevState,
				[key]: value,
			}));
		};

	return (
		<>
			<ArrowButton isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<div className={styles.wrapper}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleSelectChange('fontFamilyOption')}
							title='Шрифт'
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleSelectChange('fontSizeOption')}
							title='Размер шрифта'
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleSelectChange('fontColor')}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleSelectChange('backgroundColor')}
							title='Цвет фона'
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleSelectChange('contentWidth')}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
