import { Snackbar, Alert, SxProps, Theme } from "@mui/material";
import { NotificationPopupProps } from "../../types";

function NotificationPopup({ message, isVisible }: NotificationPopupProps) {
  return (
    <Snackbar open={isVisible} autoHideDuration={1500}>
      <Alert severity="success" sx={alertStyles}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationPopup;

const alertStyles: SxProps<Theme> = {
  width: "100%",
};
