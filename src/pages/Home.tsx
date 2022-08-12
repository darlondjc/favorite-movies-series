import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { SearchAppBar } from "../components/SearchAppBar";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {
    const [movies, setMovies] = useState([]);

    const getMovies = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
    }

    useEffect(() => {
        const url = `${moviesURL}top_rated?${apiKey}`;
        getMovies(url);
    }, []);


    return (
        <div>
            <SearchAppBar showSearch={true}/>
            <Box sx={{ margin: 2, display: "flex", alignContent: "center" }}>
                <Grid container spacing={2}>
                    {movies && movies.map((movie: any) => {
                        console.log(movie);
                        return <Grid item xs={2}><MovieCard movie={movie} /></Grid>;
                    })}
                </Grid>
            </Box>
        </div>
    );
}