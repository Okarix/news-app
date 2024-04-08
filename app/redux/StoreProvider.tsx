'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { fetchNewsBySort } from './slices/newsSlice';

export default function StoreProvider({ sort, children }: { sort: string; children: React.ReactNode }) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = makeStore();
		storeRef.current.dispatch(fetchNewsBySort(sort));
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}
