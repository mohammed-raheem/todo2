import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    document.dir = i18n.dir();
  }, [i18n, language]);

  const handleChange = useMemo(
    () => (event: SelectChangeEvent<string>) => {
      const newLang = event.target.value;
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
    },
    [i18n]
  );

  return (
    <Select
      value={language}
      onChange={handleChange}
      sx={selectStyles}
      IconComponent={LanguageIcon}
      MenuProps={{
        PaperProps: {
          sx: menuPaperStyles,
        },
      }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">العربية</MenuItem>
    </Select>
  );
};

export default LanguageToggle;

const selectStyles: SxProps<Theme> = {
  height: "36px",
  minWidth: "120px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#f0f2f5" : "#2c2c2c",
  color: (theme) => (theme.palette.mode === "light" ? "#1a237e" : "#90caf9"),
  "&:hover": {
    backgroundColor: (theme) =>
      theme.palette.mode === "light" ? "#e8eaf6" : "#3c3c3c",
  },
  "& .MuiSelect-select": {
    paddingRight: "32px",
  },
  "& .MuiSvgIcon-root": {
    color: "inherit",
  },
  borderRadius: "18px",
  border: (theme) =>
    `1px solid ${theme.palette.mode === "light" ? "#1a237e" : "#90caf9"}`,
};

const menuPaperStyles: SxProps<Theme> = {
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#ffffff" : "#424242",
  "& .MuiMenuItem-root": {
    color: (theme) => (theme.palette.mode === "light" ? "#1a237e" : "#90caf9"),
    "&:hover": {
      backgroundColor: (theme) =>
        theme.palette.mode === "light" ? "#e8eaf6" : "#3c3c3c",
    },
  },
};
