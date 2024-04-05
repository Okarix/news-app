import NewsCard from './news-card';

export default function Cards() {
	return (
		<main className='flex flex-wrap justify-center gap-4'>
			<NewsCard />
			<NewsCard />
			<NewsCard />
			<NewsCard />
			<NewsCard />
			<NewsCard />
		</main>
	);
}
