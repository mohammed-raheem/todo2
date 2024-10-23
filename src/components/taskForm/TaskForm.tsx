import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types";
import { addTask, editTask } from "../../redux/tasksSlice";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  SxProps,
  Theme,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NotificationPopup from "../notificationPopup/NotificationPopup";
import useAuthenticated from "../../hooks/useAuthenticated";
import { useTranslation } from "react-i18next";

function TaskForm() {
  const { t, i18n } = useTranslation();
  const isAuthenticated = useAuthenticated();
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const [task, setTask] = useState("");
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const isEdit = taskId !== undefined;

  useEffect(() => {
    if (isEdit) {
      const existingTask = tasks.find((t) => t.id === Number(taskId));
      if (existingTask) {
        setTask(existingTask.title);
      } else {
        navigate("/tasks");
      }
    }
  }, [isEdit, taskId, tasks, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(editTask({ id: Number(taskId), title: task }));
    } else {
      dispatch(addTask(task));
      setTask("");
    }

    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={rootStyles}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={contentPaperStyles}>
          <IconButton component={Link} to="/tasks" sx={backButtonStyles}>
            {i18n.language === "en" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </IconButton>
          <Typography variant="h4" component="h1" sx={titleStyles}>
            {isEdit ? t("editTask") : t("addTask")}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <TextField
              fullWidth
              variant="outlined"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder={t("taskPlaceholder")}
              autoFocus
              required
              sx={inputStyles}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={buttonStyles}
            >
              {isEdit ? t("editTask") : t("addTask")}
            </Button>
          </Box>
        </Paper>
      </Container>
      <NotificationPopup
        message={isEdit ? t("taskUpdated") : t("taskAdded")}
        isVisible={isNotificationVisible}
      />
    </Box>
  );
}

export default TaskForm;

const rootStyles: SxProps<Theme> = {
  width: "100%",
  minHeight: "100vh",
  paddingTop: "150px",
  paddingBottom: "40px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#f0f2f5" : "#121212",
};

const contentPaperStyles: SxProps<Theme> = {
  padding: "40px",
  borderRadius: "12px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
  position: "relative",
};

const backButtonStyles: SxProps<Theme> = {
  position: "absolute",
  top: "20px",
  left: (theme) => (theme.direction === "rtl" ? "auto" : "20px"),
  right: (theme) => (theme.direction === "rtl" ? "20px" : "auto"),
  color: (theme) => theme.palette.text.secondary,
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
    "&:hover fieldset": {
      borderColor: (theme) =>
        theme.palette.mode === "light" ? "#1a237e" : "#90caf9",
    },
    "&.Mui-focused fieldset": {
      borderColor: (theme) =>
        theme.palette.mode === "light" ? "#1a237e" : "#90caf9",
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
