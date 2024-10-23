import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  SxProps,
  Theme,
} from "@mui/material";

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // static user data
  const userData = {
    email: "m@gmail.com",
    password: "123",
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === userData.email && password === userData.password) {
      dispatch(login());
      navigate("tasks");
    } else {
      alert(t("loginFailed"));
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("tasks");
    }
  }, [navigate]);

  return (
    <Box sx={rootStyles}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={paperStyles}>
          <Typography variant="h4" component="h1" sx={titleStyles}>
            {t("loginTitle")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <TextField
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("email")}
              required
              sx={inputStyles}
            />
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password")}
              required
              sx={inputStyles}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={buttonStyles}
            >
              {t("loginButton")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;

const rootStyles: SxProps<Theme> = {
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#f0f2f5" : "#121212",
};

const paperStyles: SxProps<Theme> = {
  padding: "40px",
  borderRadius: "12px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
  boxShadow: (theme) =>
    theme.palette.mode === "light"
      ? "0 4px 6px rgba(0, 0, 0, 0.1)"
      : "0 4px 6px rgba(255, 255, 255, 0.1)",
};

const titleStyles: SxProps<Theme> = {
  textAlign: "center",
  marginBottom: "40px",
  fontWeight: "bold",
  color: (theme) => (theme.palette.mode === "light" ? "#1a237e" : "#90caf9"),
};

const formStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputStyles: SxProps<Theme> = {
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#f8f9fa" : "#2c2c2c",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: (theme) =>
        theme.palette.mode === "light" ? "#ced4da" : "#424242",
    },
  },
};

const buttonStyles: SxProps<Theme> = {
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#1a237e" : "#3f51b5",
  "&:hover": {
    backgroundColor: (theme) =>
      theme.palette.mode === "light" ? "#3f51b5" : "#5c6bc0",
  },
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "1rem",
  padding: "12px",
};
