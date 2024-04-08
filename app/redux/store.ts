import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './slices/newsSlice';

export const makeStore = () => {
	return configureStore({
		reducer: {
			news: newsSlice,
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
