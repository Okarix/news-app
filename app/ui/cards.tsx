'use client';

import NewsCard from './news-card';
import CardSkeleton from './card-skeleton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';
import { fetchNews, selectCategory, selectQuery, selectSort } from '../redux/slices/newsSlice';
import { NewsItem } from '../redux/slices/newsSlice';
import { useSelector } from 'react-redux';

export default function Cards() {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const news = useAppSelector(state => state.news.news);
	const loading = useAppSelector(state => state.news.loading);
	const dispatch = useAppDispatch();
	const sort = useSelector(selectSort);
	const category = useSelector(selectCategory);
	const query = useSelector(selectQuery);

	useEffect(() => {
		dispatch(fetchNews({ sort: 'popularity' }));
	}, []);

	useEffect(() => {
		const fetchNewsForPage = async () => {
			try {
				const response = await dispatch(fetchNews({ sort: sort ? sort : 'popularity', category, query }));
				const totalArticlesPages = Math.ceil(response.payload.articles.length / 6);
				setTotalPages(totalArticlesPages);
				if (currentPage > totalPages) {
					setCurrentPage(totalPages);
				}
			} catch (error) {
				console.error('Error fetching news:', error);
			}
		};
		fetchNewsForPage();
	}, [currentPage, dispatch]);

	const onPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const onNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	return (
		<main className='flex flex-wrap justify-center gap-4'>
			{loading
				? Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
				: news?.slice((currentPage - 1) * 6, currentPage * 6).map((i: NewsItem, index: number) => {
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
			<div className='flex justify-center mt-4'>
				<button
					className='bg-gray-200 p-2 rounded-md mr-2 disabled:opacity-50'
					onClick={onPreviousPage}
					disabled={currentPage === 1}
				>
					Предыдущая
				</button>
				<button
					className='bg-gray-200 p-2 rounded-md disabled:opacity-50'
					onClick={onNextPage}
					disabled={currentPage === totalPages}
				>
					Следующая
				</button>
			</div>
		</main>
	);
}
