'use client';

import { useDebouncedCallback } from 'use-debounce';
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, MenuDivider, Button, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRef } from 'react';
import { useAppDispatch, useAppStore, useAppSelector } from '../redux/hooks';
import { fetchNewsByCategory, fetchNewsBySearch, fetchNewsBySort } from '../redux/slices/newsSlice';

export default function NavBar() {
	const store = useAppStore();
	const initialized = useRef(false);
	if (!initialized.current) {
		store.dispatch(fetchNewsBySort('popularity'));
		initialized.current = true;
	}

	const names = useAppSelector(state => state.news.names);
	const dispatch = useAppDispatch();

	const handleCategoryChange = (category: string) => {
		dispatch(fetchNewsByCategory(category));
	};

	const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(fetchNewsBySearch(e.target.value));
		console.log('searching', e.target.value);
	}, 500);

	return (
		<nav className='border-2 rounded-xl bg-white border-[#E2E8F0] px-7 py-3 flex items-center justify-between'>
			<Link
				href='/'
				className='text-sky-600 font-bold hover:text-sky-500'
			>
				News App
			</Link>
			<Text className='text-sky-600 font-bold '>sorting by {names}</Text>
			<Input
				onChange={e => handleSearch(e)}
				placeholder='Поиск по новостям'
				width='400px'
			/>
			<Menu closeOnSelect={false}>
				<MenuButton
					as={Button}
					colorScheme='blue'
					size='md'
				>
					Фильтровать
				</MenuButton>
				<MenuList minWidth='240px'>
					<MenuOptionGroup
						defaultValue='popular'
						title='По дате'
						type='radio'
					>
						<MenuItemOption
							value='popular'
							onClick={() => dispatch(fetchNewsBySort('popularity'))}
						>
							Популярные
						</MenuItemOption>
						<MenuItemOption
							value='latest'
							onClick={() => dispatch(fetchNewsBySort('publishedAt'))}
						>
							Последние
						</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuOptionGroup
						title='По категориям'
						type='radio'
					>
						<MenuItemOption
							value='business'
							onClick={() => handleCategoryChange('business')}
						>
							Бизнес
						</MenuItemOption>
						<MenuItemOption
							value='sports'
							onClick={() => handleCategoryChange('sports')}
						>
							Спорт
						</MenuItemOption>
						<MenuItemOption
							value='technology'
							onClick={() => handleCategoryChange('technology')}
						>
							Технологии
						</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</nav>
	);
}
