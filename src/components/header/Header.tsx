import { Box, SxProps, Theme } from "@mui/material";
import LanguageToggle from "../languageToggle/LanguageToggle";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Logout from "../logout/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Box sx={headerStyles}>
      <LanguageToggle />
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ThemeToggle />
        {isAuthenticated && <Logout />}
      </Box>
    </Box>
  );
};

export default Header;

const headerStyles: SxProps<Theme> = {
  position: "absolute",
  top: "0",
  right: "0",
  left: "0",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  width: "100%",
};
