import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { MyAppBar } from "../components/MyAppBar";

const popularMoviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

type Movie = {
    id: string,
    title: string,
    overview: string,
    poster_path: string,
    favorite: boolean
}

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const getMovies = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
    }

    useEffect(() => {
        const url = `${popularMoviesURL}popular?${apiKey}`;
        getMovies(url);
    }, []);

    function handleChange(event: any) {
        console.log(event.target.value);
        setTermoPesquisa(event.target.value);
    }

    const popularMoviesFiltered = movies?.filter((movie: Movie) => {
        if (termoPesquisa != null) {
            return movie.title.toLowerCase().includes(termoPesquisa.toLowerCase());
        }
    });
    return (
        <div>
            <MyAppBar showSearch={true} termoPesquisa={{ onChange: handleChange }} />
            <Typography gutterBottom variant="h5" component="div" sx={{ marginLeft: 10, marginTop: 2 }}>
                Popular Movies
            </Typography>
            <Grid container spacing={5} sx={{ marginLeft: 5, width: '95%' }}>
                {popularMoviesFiltered?.map((movie: any) => {
                    //console.log(movie);
                    return <Grid key={movie.title} item xs={3}><MovieCard movie={movie} /></Grid>;
                })}
            </Grid>
        </div>
    );
}