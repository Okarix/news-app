import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const fetchNewsBySort = createAsyncThunk('news/fetchNewsBySort', async (sort: string) => {
	try {
		const res = await fetch(`https://newsapi.org/v2/everything?domains=bbc.com&language=ru&sortBy=${sort}&pageSize=30&apiKey=ba19e3583f494f5785a401428a400105`);

		if (!res.ok) {
			throw new Error('Ошибка при загрузке данных');
		}
		return res.json();
	} catch (err) {
		console.error(err);
		throw err;
	}
});

export const fetchNewsByCategory = createAsyncThunk('news/fetchNewsByCategory', async (category: string) => {
	try {
		const res = await fetch(`https://newsapi.org/v2/top-headlines?language=ru&category=${category}&pageSize=30&apiKey=ba19e3583f494f5785a401428a400105`);

		if (!res.ok) {
			throw new Error('Ошибка при загрузке данных');
		}
		return res.json();
	} catch (err) {
		console.error(err);
		throw err;
	}
});

export const fetchNewsBySearch = createAsyncThunk('news/fetchNewsBySearch', async (q: string) => {
	try {
		const res = await fetch(`https://newsapi.org/v2/everything?language=ru&q=${q}&pageSize=30&apiKey=ba19e3583f494f5785a401428a400105`);

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
	names: string | null;
}

const initialState: NewsState = {
	news: [],
	loading: false,
	error: false,
	names: null,
};

export const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchNewsBySort.pending, state => {
				state.loading = true;
				state.error = false;
				state.names = '';
			})
			.addCase(fetchNewsBySort.fulfilled, (state, action) => {
				state.loading = false;
				state.news = action.payload;
				state.names = action.meta.arg;
			})
			.addCase(fetchNewsBySort.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchNewsByCategory.pending, state => {
				state.loading = true;
				state.error = false;
				state.names = '';
			})
			.addCase(fetchNewsByCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.news = action.payload;
				state.names = action.meta.arg;
			})
			.addCase(fetchNewsByCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchNewsBySearch.pending, state => {
				state.loading = true;
				state.error = false;
				state.names = '';
			})
			.addCase(fetchNewsBySearch.fulfilled, (state, action) => {
				state.loading = false;
				state.news = action.payload;
				state.names = action.meta.arg;
			})
			.addCase(fetchNewsBySearch.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const selectNews = (state: RootState) => state.news.news;
export default newsSlice.reducer;
