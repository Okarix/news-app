import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface FetchNewsOptions {
	sort?: string;
	category?: string;
	query?: string;
}

const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || 'ba19e3583f494f5785a401428a400105';

export const fetchNews = createAsyncThunk('news/fetchNews', async ({ sort, category, query }: FetchNewsOptions) => {
	try {
		let url = '';
		if (category) {
			url = `https://newsapi.org/v2/top-headlines?language=ru&category=${category}&pageSize=30&apiKey=${apiKey}`;
		} else if (query) {
			url = `https://newsapi.org/v2/everything?language=ru&q=${query}&pageSize=30&apiKey=${apiKey}`;
		} else {
			url = `https://newsapi.org/v2/everything?domains=bbc.com&language=ru&sortBy=${sort}&pageSize=30&apiKey=${apiKey}`;
		}

		const res = await fetch(url);

		if (!res.ok) {
			throw new Error('Ошибка при загрузке данных');
		}
		return res.json();
	} catch (err) {
		console.error(err);
		throw err;
	}
});

export interface NewsItem {
	title: string;
	description: string;
	urlToImage: string;
	url: string;
}

export interface NewsState {
	news: NewsItem[];
	loading: boolean;
	error: string | boolean | undefined;
	names: string | undefined;
	currentPage: number;
	sort: string | undefined;
	category: string | undefined;
	query: string | undefined;
}

const initialState: NewsState = {
	news: [],
	loading: false,
	error: false,
	names: undefined,
	currentPage: 1,
	sort: undefined,
	category: undefined,
	query: undefined,
};

export const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCategory(state, action) {
			state.category = action.payload;
		},
		setQuery(state, action) {
			state.query = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchNews.pending, state => {
				state.loading = true;
				state.error = false;
				state.names = '';
			})
			.addCase(fetchNews.fulfilled, (state, action) => {
				state.loading = false;
				state.news = action.payload.articles;
				state.names = action.meta.arg.sort || action.meta.arg.category || action.meta.arg.query || '';
			})
			.addCase(fetchNews.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setSort, setCategory, setQuery } = newsSlice.actions;
export const selectSort = (state: RootState) => state.news.sort;
export const selectCategory = (state: RootState) => state.news.category;
export const selectQuery = (state: RootState) => state.news.query;

export const selectNews = (state: RootState) => state.news.news;
export default newsSlice.reducer;
