import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, Button, Tag, Input } from '@chakra-ui/react';
import Link from 'next/link';

export default function NavBar() {
	return (
		<nav className='border-2 rounded-xl border-[#E2E8F0]  px-7 py-3 flex items-center justify-between'>
			<Link
				href='/'
				className='text-sky-600 font-bold'
			>
				News App
			</Link>
			<Input
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
						defaultValue='asc'
						title='По дате'
						type='radio'
					>
						<MenuItemOption value='asc'>Последние</MenuItemOption>
						<MenuItemOption value='desc'>Первые</MenuItemOption>
					</MenuOptionGroup>
					<MenuDivider />
					<MenuOptionGroup
						title='По категориям'
						type='checkbox'
					>
						<MenuItemOption value='email'>Главные</MenuItemOption>
						<MenuItemOption value='phone'>Спорт</MenuItemOption>
						<MenuItemOption value='country'>Экономика</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</nav>
	);
}
