import { TaskFilterProps, FilterValue } from "../../types";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function TaskFilter({
  tasks,
  setFilteredTasks,
  setCurrentFilter,
}: TaskFilterProps) {
  const { t } = useTranslation();

  const handleFilter = (e: SelectChangeEvent<FilterValue>) => {
    const value = e.target.value as FilterValue;

    setCurrentFilter(value);
    setFilteredTasks(
      tasks.filter((task) => {
        if (value === "completed") return task.completed;
        if (value === "pending") return !task.completed;
        return true;
      })
    );
  };

  return (
    <Select
      defaultValue="all"
      onChange={handleFilter}
      sx={filterStyles}
      MenuProps={{
        PaperProps: {
          sx: menuPaperStyles,
        },
      }}
    >
      <MenuItem value="all">{t("all")}</MenuItem>
      <MenuItem value="completed">{t("completed")}</MenuItem>
      <MenuItem value="pending">{t("pending")}</MenuItem>
    </Select>
  );
}

export default TaskFilter;

const filterStyles: SxProps<Theme> = {
  height: "36px",
  minWidth: "120px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#cccddf" : "#2c2c2c",
  "&:hover": {
    backgroundColor: (theme) =>
      theme.palette.mode === "light" ? "#cccfff" : "#3c3c3c",
  },
  "& .MuiSelect-select": {
    padding: "6px 14px",
    textAlign: (theme) => (theme.direction === "rtl" ? "right" : "left"),
  },
  "& .MuiSelect-icon": {
    right: (theme) => (theme.direction === "rtl" ? "auto" : "7px"),
    left: (theme) => (theme.direction === "rtl" ? "7px" : "auto"),
  },
};

const menuPaperStyles: SxProps<Theme> = {
  maxHeight: "208px",
  "& .MuiMenuItem-root": {
    height: "36px",
  },
};
