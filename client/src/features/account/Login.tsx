import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { signInUser } from "./AccountSlice";

const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const location = useLocation<any>();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  async function submitForm(data: FieldValues) {
    await dispatch(signInUser(data));
    history.push(location.state?.from?.pathname || "/catalog");
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="User Name"
          {...register("username", {
            required: "User Name is required!",
          })}
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required!",
          })}
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isValid}
        >
          Sign In
        </LoadingButton>
        <Grid container sx={{ padding: "2" }}>
          <Grid item>
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}