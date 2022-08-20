import { createContext, useContext } from 'react';

const GlobalContext = createContext({});

export function GlobalProvider({ children }: any) {
    const VITE_API_KEY = 'api_key=8ed200f50a6942ca5bc8b5cdec27ff22';
    const VITE_API = 'https://api.themoviedb.org/3/movie/';
    const VITE_SEARCH = 'https://api.themoviedb.org/3/search/movie/';
    const VITE_IMG = 'https://image.tmdb.org/t/p/w500/';

    return (
        <GlobalContext.Provider
            value={{ VITE_API_KEY, VITE_API, VITE_SEARCH,VITE_IMG }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    const context = useContext(GlobalContext);
    const { VITE_API_KEY, VITE_API, VITE_SEARCH,VITE_IMG } = context;
    return { VITE_API_KEY, VITE_API, VITE_SEARCH,VITE_IMG };
}
