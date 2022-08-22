import { Card, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/auth';


const theme = createTheme();

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const context = useAuth();

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(context);
    

    if (!email || !password || !confirmPassword) {
      setError("Please, fill all the fields");
      return;
    } else if (password !== confirmPassword) {
      setError("Password and his confirm are diffent");
      return;
    }

    const res = null;
    
    if (res != null) {
      setError(res);
      return;
    }

    alert("User saved sucessfully!");
    navigate("/");

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardContent>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyItems="center"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
              </Grid>
            </Grid>
            <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => [setEmail(e.target.value), setError("")]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => [setPassowrd(e.target.value), setError("")]}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm the Password"
                type="password"
                id="confirmPassword"
                autoComplete="repeat-current-password"
                onChange={(e) => [setConfirmPassowrd(e.target.value), setError("")]}
              />
              <Typography component="span" sx={{color: 'red'}}>{error}</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                <Typography component="span">Already a user? </Typography>
                  <Link href={'/'} variant="body2">
                    Go to Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
