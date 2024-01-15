import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi';
import { config } from './config/config.ts';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <App />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    closeOnClick={false}
                    draggable={false}
                />
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>,
);
