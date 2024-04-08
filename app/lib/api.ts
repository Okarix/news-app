import { useState } from 'react';

let news: any;
const API_KEY = process.env.API_KEY;

export async function getNewsBySort(sort: string, setLoading: React.Dispatch<React.SetStateAction<any>>) {
	try {
		setLoading(true);

		const res = await fetch(`https://newsapi.org/v2/everything?domains=bbc.com&language=ru&sortBy=${sort}&pageSize=30&apiKey=ba19e3583f494f5785a401428a400105`);

		if (!res.ok) {
			throw new Error('Ошибка при загрузке данных');
		}

		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
	} finally {
		setLoading(false);
	}
}

export async function getNewsByCategory(category: string, setLoading: React.Dispatch<React.SetStateAction<any>>) {
	try {
		setLoading(true);

		const res = await fetch(`${API_KEY}top-headlines?language=ru&category=${category}&pageSize=30&apiKey=ba19e3583f494f5785a401428a400105`);

		if (!res.ok) {
			throw new Error('Ошибка при загрузке данных');
		}

		const data = await res.json();
		return data;
	} catch (err) {
		console.error(err);
	} finally {
		setLoading(false);
	}
}
