import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Alert, CardActionArea, CardActions, Collapse, Snackbar } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../contexts/global';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface SnackbarMessage {
    message: string;
    key: number;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function MovieCard(props: any) {
    const globalContext = useContext(GlobalContext);
    
    const [expanded, setExpanded] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        if (snackPack.length) {
            // Set a new snack when we don't have an active one
            setSnackPack((prev) => prev.slice(1));
            setOpenSnackBar(true);
        } else if (snackPack.length && openSnackBar) {
            // Close an active snack when a new one is added
            setOpenSnackBar(false);
        }
    }, [snackPack, open]);

    const handleFavorite = () => {
        setOpenSnackBar(true);
        if (!favorite) {
            setSnackPack((prev) => [...prev, { message: 'Set favorited!', key: new Date().getTime() }]);
            setFavorites(prevFavorites => [...prevFavorites, props.movie.id]);
        } else {
            setSnackPack((prev) => [...prev, { message: 'Set unfavorited!', key: new Date().getTime() }]);
            setFavorites(prevFavorites => [...prevFavorites.slice(props.movie.id)]);
        }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const favorite = favorites.find(favorite => favorite === props.movie.id);

    return (
        <Card sx={{
            maxWidth: 345,
            minHeight: 600,
            position: expanded ? 'absolute' : 'relative',
            zIndex: expanded ? 10 : 0,
            border: expanded ? 1 : 0,
            borderColor: "#d3d3d3"
        }}>
            <CardActionArea component={Link} to={'/movie/' + props.movie.id}>
                <CardMedia
                    component="img"
                    image={globalContext.VITE_IMG + props.movie.poster_path}
                    alt={props.movie.title}
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {props.movie.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleFavorite}>
                    <FavoriteIcon color={favorite ? 'primary' : 'disabled'} />
                </IconButton>
                <Snackbar open={openSnackBar} autoHideDuration={5000} onClose={handleCloseSnack}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                    <Alert onClose={handleCloseSnack} severity="info" sx={{ width: '100%' }}>
                        {favorite ? 'Set favorited!' : 'Set unfavorited!'}
                    </Alert>
                </Snackbar>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout={0}>
                <CardContent>
                    <Typography>
                        {props.movie.overview}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
