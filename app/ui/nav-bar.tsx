'use client';

import { useDebouncedCallback } from 'use-debounce';
import { Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, MenuDivider, Button, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setCategory, setSort, setQuery, fetchNews } from '../redux/slices/newsSlice';

export default function NavBar() {
	const names = useAppSelector(state => state.news.names);
	const dispatch = useAppDispatch();

	const handleCategoryChange = (category: string) => {
		dispatch(setCategory(category));
		dispatch(fetchNews({ category: category }));
	};

	const handleSortChange = (sort: string) => {
		dispatch(setSort(sort));
		dispatch(fetchNews({ sort: sort }));
	};

	const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setQuery(e.target.value));
		dispatch(fetchNews({ query: e.target.value }));
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
						title='По дате'
						defaultValue='popular'
					>
						<MenuItemOption
							value='popular'
							onClick={() => handleSortChange('popularity')}
						>
							Популярные
						</MenuItemOption>
						<MenuItemOption
							value='latest'
							onClick={() => handleSortChange('publishedAt')}
						>
							Последние
						</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuOptionGroup title='По категориям'>
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
