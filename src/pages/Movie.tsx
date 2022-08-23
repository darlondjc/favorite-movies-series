import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import axios from 'axios';
import React from 'react';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyAppBar } from "../components/MyAppBar";
import { GlobalContext } from '../contexts/global';

export const Movie = () => {
    const globalContext = useContext(GlobalContext);
    
    const { id } = useParams();
    const [movie, setMovie] = useState<any>([]);

    const getMovie = async (url: string) => {
        await axios.get(url)
            .then(response => setMovie(response.data));
    }

    useEffect(() => {
        const movieUrl = `${globalContext.VITE_API}${id}?${globalContext.VITE_API_KEY}`;
        getMovie(movieUrl);
    }, []);

    return (
        <div>
            <MyAppBar showSearch={false} title={movie.title} voltar={true}/>
            <Grid container>
                <Grid item xs={2} sx={{ margin: 5 }}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={globalContext.VITE_IMG + movie.poster_path}
                            alt={movie.title}
                        />
                    </Card>
                </Grid>
                <Grid item xs={5} sx={{ margin: 5 }}>
                    <Grid container direction="column" alignItems="left">
                        <Grid item xs={2}>
                            <Typography gutterBottom variant="h6" component="div">
                                {movie.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography sx={{ textAlign: 'justify' }}>
                                {movie.overview}
                            </Typography></Grid>
                        <Grid container>
                            <Grid item style={{ flexGrow: "1" }}></Grid>
                            <Grid item xs={0.5}>
                                <IconButton color="primary">
                                    <FavoriteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div >
    );
}