import NewsCard from './news-card';

export async function getNews() {
	const res = await fetch('https://newsapi.org/v2/everything?domains=bbc.com&language=ru&sortBy=popularity&pageSize=30&apiKey=ba19e3583f494f5785a401428a400105', { next: { revalidate: 3600 } });
	return res.json();
}

type StateTypes = {
	title: string;
	description: string;
	urlToImage: string;
	url: string;
};

export default async function Cards() {
	const data = await getNews();
	return (
		<main className='flex flex-wrap justify-center gap-4'>
			{data.articles.map((i: StateTypes) => {
				return (
					<NewsCard
						key={i.urlToImage}
						title={i.title}
						description={i.description}
						urlToImage={i.urlToImage}
						url={i.url}
					/>
				);
			})}
		</main>
	);
}
