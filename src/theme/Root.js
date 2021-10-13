import React from 'react';

import { AppProvider } from './../state/app';

function Root({ children }) {
	return <AppProvider>
		{children}
	</AppProvider>;
}

export default Root;