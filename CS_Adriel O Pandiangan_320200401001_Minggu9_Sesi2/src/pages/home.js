import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import axios from "axios";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Home = () => {
  const navigate = useNavigate();

  // State untuk mengecek apakah user sudah login atau belum
  const [isLogin, setIsLogin] = React.useState(false);

  // Modifikasi kode di bawah ini untuk mengambil data dari localstorage
  React.useEffect(() => {
    // 1. Ambil data 'user' dan 'token' dari localstorage
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    // 2. Lempar ke halaman login bila user atau token tidak ada
    if ((token = "" || !token)) {
      return navigate("/login");
    }

    // 3. definisikan fungsi verifikasi token
    // fungsi ini akan melakukan HTTP POST request ke endpoint
    // /verify pada backend dengan mengirimkan token yang didapat dari localstorage.
    // bila response status-nya 200 dan id dari response sama dengan id user pada localstorage,
    // set isLogin menjadi true. bila tidak, redirect ke halaman login
    const verify = async () => {
      try {
        const response = await axios.post("http://localhost:3000/verify", {
          token: localStorage.getItem("token"),
        });
        if (response.status == 200) {
          setIsLogin(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    // 4. Panggil fungsi verifikasi token
    verify();
  }, []);

  const handleToHome = () => {
    window.location.href = "/";
  };

  if (!isLogin) {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleToHome}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Hello!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"You can view this page because you`re logged in."}
        </Typography>
        <Grid container>
          <Grid item>
            <Link href="/profile" variant="body2">
              {"Go to your profile."}
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            My sticky footer can be found here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
