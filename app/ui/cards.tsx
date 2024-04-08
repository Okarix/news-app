'use client';

import NewsCard from './news-card';
import CardSkeleton from './card-skeleton';
import { useAppStore, useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useRef } from 'react';
import { fetchNewsBySort } from '../redux/slices/newsSlice';
import { NewsItem } from '../redux/slices/newsSlice';

export default function Cards() {
	const store = useAppStore();
	const initialized = useRef(false);
	if (!initialized.current) {
		store.dispatch(fetchNewsBySort('popularity'));
		initialized.current = true;
	}
	const news = useAppSelector(state => state.news.news.articles);
	const loading = useAppSelector(state => state.news.loading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchNewsBySort('popularity'));
	}, []);

	return (
		<main className='flex flex-wrap justify-center gap-4'>
			{loading
				? Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
				: news?.map((i: NewsItem, index: number) => {
						return (
							<NewsCard
								key={index}
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
