import type { Metadata } from 'next';
import { openSans } from './ui/fonts';
import './ui/globals.css';
import { Providers } from './ui/providers';
import NavBar from './ui/nav-bar';
import StoreProvider from './redux/StoreProvider';

export const metadata: Metadata = {
	title: 'News App',
	description: 'News App like Tengri News',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<body className={`${openSans.className} bg-slate-100`}>
				<StoreProvider sort='popularity'>
					<Providers>
						<NavBar />
						{children}
					</Providers>
				</StoreProvider>
			</body>
		</html>
	);
}
