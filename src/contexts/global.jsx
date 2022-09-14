import { createContext } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const VITE_API_KEY = 'api_key=8ed200f50a6942ca5bc8b5cdec27ff22';
    const VITE_API = 'https://api.themoviedb.org/3/movie/';
    const VITE_SEARCH = 'https://api.themoviedb.org/3/search/movie/';
    const VITE_IMG = 'https://image.tmdb.org/t/p/w500/';
    
    
    const LOCAL_API = 'http://localhost:8080';

    return (
        <GlobalContext.Provider
            value={{ VITE_API_KEY, VITE_API, VITE_SEARCH, VITE_IMG, LOCAL_API }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
