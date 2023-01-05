import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
