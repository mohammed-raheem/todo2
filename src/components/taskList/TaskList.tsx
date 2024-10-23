import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Task, FilterValue } from "../../types";
import { completeTask, deleteTask } from "../../redux/tasksSlice";
import useAuthenticated from "../../hooks/useAuthenticated";
import ConfirmPopup from "../confirmPopup/ConfirmPopup";
import TaskFilter from "../taskFilter/TaskFilter";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  SxProps,
  Theme,
  Paper,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function TaskList() {
  const { t } = useTranslation();
  const isAuthenticated = useAuthenticated();
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [taskToComplete, setTaskToComplete] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterValue>("all");

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
      })
    );
  }, [tasks, currentFilter]);

  const handleShowCompletePopup = (id: number) => {
    setShowCompletePopup(true);
    setTaskToComplete(id);
  };

  const handleComplete = () => {
    if (taskToComplete !== null) {
      dispatch(completeTask(taskToComplete));
      setShowCompletePopup(false);
      setTaskToComplete(null);
    }
  };

  const handleShowDeletePopup = (id: number) => {
    setShowDeletePopup(true);
    setTaskToDelete(id);
  };

  const handleDelete = () => {
    if (taskToDelete !== null) {
      setTimeout(() => {
        dispatch(deleteTask(taskToDelete));
        setShowDeletePopup(false);
        setTaskToDelete(null);
      }, 300);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={rootStyles}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" sx={titleStyles}>
          {t("todoListTitle")}
        </Typography>
        <Paper elevation={3} sx={contentPaperStyles}>
          <Box sx={controllersStyles}>
            <Button
              component={Link}
              to="/tasks/addTask"
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={addButtonStyles}
            >
              {t("addTask")}
            </Button>
            <TaskFilter
              tasks={tasks}
              setFilteredTasks={setFilteredTasks}
              setCurrentFilter={setCurrentFilter}
            />
          </Box>
          <Divider sx={dividerStyles} />
          <List sx={tasksStyles}>
            {filteredTasks.length === 0 && (
              <ListItem>
                <ListItemText primary={t("noTasks")} sx={emptyTaskStyles} />
              </ListItem>
            )}
            {filteredTasks.map((task) => (
              <ListItem key={task.id} sx={taskStyles}>
                <ListItemIcon>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleShowCompletePopup(task.id)}
                    color="primary"
                    sx={checkboxStyles}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.title}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "text.secondary" : "text.primary",
                    textAlign: (theme) =>
                      theme.direction === "rtl" ? "right" : "left",
                  }}
                />
                <Box sx={iconButtonsStyles}>
                  <IconButton
                    component={Link}
                    to={`/tasks/editTask/${task.id}`}
                    edge="end"
                    aria-label={t("editTask")}
                    sx={iconButtonStyles}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label={t("deleteTask")}
                    onClick={() => handleShowDeletePopup(task.id)}
                    sx={iconButtonStyles}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
      {showDeletePopup && (
        <ConfirmPopup
          message={t("deleteConfirmation")}
          onConfirm={handleDelete}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}
      {showCompletePopup && (
        <ConfirmPopup
          message={t("statusChangeConfirmation")}
          onConfirm={handleComplete}
          onCancel={() => setShowCompletePopup(false)}
        />
      )}
    </Box>
  );
}

export default TaskList;

const rootStyles: SxProps<Theme> = {
  width: "100%",
  minHeight: "100vh",
  paddingTop: "80px",
  paddingBottom: "40px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#f0f2f5" : "#121212",
};

const titleStyles: SxProps<Theme> = {
  textAlign: "center",
  marginBottom: "40px",
  fontWeight: "bold",
  color: (theme) => (theme.palette.mode === "light" ? "#1a237e" : "#90caf9"),
};

const contentPaperStyles: SxProps<Theme> = {
  padding: "24px",
  borderRadius: "12px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
};

const controllersStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const addButtonStyles: SxProps<Theme> = {
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: (theme) => (theme.direction === "rtl" ? 1 : 0),
};

const dividerStyles: SxProps<Theme> = {
  margin: "0 -24px 20px",
};

const tasksStyles: SxProps<Theme> = {
  padding: 0,
};

const taskStyles: SxProps<Theme> = {
  marginBottom: "8px",
  borderRadius: "8px",
  transition: "all 0.3s ease-out",
  "&:hover": {
    backgroundColor: (theme) =>
      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c2c",
  },
};

const checkboxStyles: SxProps<Theme> = {
  color: (theme) => (theme.palette.mode === "light" ? "#1a237e" : "#90caf9"),
};

const iconButtonsStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 1,
};

const iconButtonStyles: SxProps<Theme> = {
  color: (theme) => (theme.palette.mode === "light" ? "#757575" : "#9e9e9e"),
};

const emptyTaskStyles: SxProps<Theme> = {
  textAlign: "center",
  fontStyle: "italic",
  color: (theme) => (theme.palette.mode === "light" ? "#757575" : "#9e9e9e"),
};
