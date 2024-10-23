import { useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RootState } from "./types";
import { setTheme } from "./redux/themeSlice";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import TaskList from "./components/taskList/TaskList";
import TaskForm from "./components/taskForm/TaskForm";

function App() {
  const themeMode = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme as "light" | "dark"));
    }
  }, [dispatch]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        typography: {
          fontFamily:
            i18n.language === "ar"
              ? "Cairo, Arial, sans-serif"
              : "Roboto, Arial, sans-serif",
        },
      }),
    [themeMode, i18n.language]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/addTask" element={<TaskForm />} />
        <Route path="tasks/editTask/:taskId" element={<TaskForm />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
