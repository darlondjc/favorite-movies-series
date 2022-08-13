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
import { useState } from 'react';
import { Link } from 'react-router-dom';

const imageURL = import.meta.env.VITE_IMG;

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
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
    const [expanded, setExpanded] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    const handleFavorite = () => {
        setOpenSnackBar(true);
        if (!favorite) {
            setFavorites(prevFavorites => [...prevFavorites, props.movie.id]);
        } else {
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
                    image={imageURL + props.movie.poster_path}
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
