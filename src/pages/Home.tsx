import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { SearchAppBar } from "../components/SearchAppBar";

const popularMoviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const getMovies = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
        //console.log(data.results);
    }

    useEffect(() => {
        const url = `${popularMoviesURL}popular?${apiKey}`;
        getMovies(url);
    }, []);

    function handleChange(event: any) {
        console.log(event.target.value);
        setTermoPesquisa(event.target.value);
    }

    const popularMoviesFiltered = movies?.filter((movie: any) => {
        if (termoPesquisa != null) {
            return movie.title.toLowerCase().includes(termoPesquisa.toLowerCase());
        }
    });
    return (
        <div>
            <SearchAppBar showSearch={true} termoPesquisa={{ onChange: handleChange }} />
            <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: 6, marginRight: 2, marginTop: 2 }}>
                Popular Movies
            </Typography>
            <Grid container spacing={4} sx={{ marginLeft: 2, marginRight: 2, marginTop: 1, display: "flex" }}>
                {popularMoviesFiltered?.map((movie: any) => {
                    //console.log(movie);
                    return <Grid item xs={3}><MovieCard movie={movie} /></Grid>;
                })}
            </Grid>
        </div>
    );
}