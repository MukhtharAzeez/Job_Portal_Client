import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  CircularProgress,
  FormControl,
  Snackbar,
  Typography,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FilledInput } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../../redux/user/userAuthSlicer";
import PublicRoute from "../../../protectRoutes/PublicRoute";

const theme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("signInWith", "email");
    try {
      setIsLoading(true);
      const user = await axios.post("http://localhost:4000/user/signup", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem(
        "userName",
        user.data.firstName + " " + user.data.lastName
      );
      localStorage.setItem("email", user.data.email);
      localStorage.setItem("userId", user.data._id);
      dispatch(addUserDetails(user.data));
      router.push("/");
    } catch (error: any) {
      const type = typeof error.response.data.message;
      if (type == "string") {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.response.data.message[0]);
      }
      setOpen(true);
      setIsLoading(false);
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginPage = () => router.push("/User/Login");

  return (
    <PublicRoute>
      <ThemeProvider theme={theme}>
        <Box
          bgcolor={"white"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              paddingLeft: 18,
            }}
          >
            <Image
              src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
              alt=""
              width={480}
              height={480}
            />
          </Box>
          <Container
            component="main"
            sx={{ marginLeft: { md: 8, xs: "auto" } }}
            maxWidth="xs"
          >
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
                SIGN UP
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      variant="filled"
                      autoFocus
                      size="small"
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      variant="filled"
                      size="small"
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      variant="filled"
                      size="small"
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      id="mobile"
                      label="Mobile"
                      name="mobile"
                      autoComplete="email"
                      variant="filled"
                      size="small"
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      autoComplete="Password"
                      variant="filled"
                      size="small"
                      type="password"
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <FilledInput
                        name="confirmPassword"
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="TermsAndConditions"
                          defaultChecked
                          sx={{
                            color: "#6c63ff",
                            "&.Mui-checked": {
                              color: "#6c63ff",
                            },
                          }}
                          color="primary"
                        />
                      }
                      label="Accept Terms And Conditions"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#6c63ff",
                    height: 50,
                    "&:hover": { backgroundColor: "#6c63ff" },
                  }}
                  style={{ backgroundColor: "#6c63ff" }}
                >
                  {isLoading ? (
                    <CircularProgress sx={{ color: "white" }} />
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <Grid container justifyContent="center">
                  <Grid item sx={{ cursor: "pointer" }}>
                    <p onClick={loginPage}>Already have an account? Sign In</p>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </ThemeProvider>
    </PublicRoute>
  );
}

// export async function getServerSideProps({ req }: { req: any }) {
//   const l = Object.keys(req.cookies).length;
//   const cookies = req.cookies;
//   if (l < 3) {
//     return {
//       props: {
//         cookies,
//       },
//     };
//   } else {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
// }
