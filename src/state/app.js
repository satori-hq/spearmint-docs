import { State } from '../utils/state';

// example
const initialState = {
	app: {
		mounted: false,
		env: 'testnet',
		keys: { getKey: () => {} }
	},
};

export const { appStore, AppProvider } = State(initialState, 'app');

export const onAppMount = () => async ({ update, getState, dispatch }) => {
	update('app', { mounted: true });
};

/// helpers
