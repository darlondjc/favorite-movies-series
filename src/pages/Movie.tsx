import FavoriteIcon from '@mui/icons-material/Favorite';
import { Card, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyAppBar } from "../components/MyAppBar";

const moviesURL = import.meta.env.VITE_API;
const imageURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>([]);

    const getMovie = async (url: string) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie(data);
    }

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}`;
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
                            image={imageURL + movie.poster_path}
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