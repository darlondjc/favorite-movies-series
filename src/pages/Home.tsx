import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { MyAppBar } from "../components/MyAppBar";
import { GlobalContext } from "../contexts/global";

type Movie = {
    id: string,
    title: string,
    overview: string,
    poster_path: string,
    favorite: boolean
}

export const Home = () => {
    const globalContext = useContext(GlobalContext);
    const [movies, setMovies] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const getMovies = async (url: string) => {
        await axios.get(url)
            .then(response => {
                console.log(response.data);
                
                //setMovies(response.data.results)
                setMovies(response.data)
            });
    }

    useEffect(() => {
        //const url = `${globalContext.VITE_API}popular?${globalContext.VITE_API_KEY}`;
        const url = `${globalContext.LOCAL_API}/movie`;
        getMovies(url);
    }, []);

    function handleChange(event: any) {
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
                    return <Grid key={movie.title} item xs={3}><MovieCard movie={movie} /></Grid>;
                })}
            </Grid>
        </div>
    );
}