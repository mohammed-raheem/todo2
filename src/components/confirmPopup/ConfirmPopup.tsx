import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  SxProps,
  Theme,
} from "@mui/material";
import { ConfirmPopupProps } from "../../types";
import { useTranslation } from "react-i18next";

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={true}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: dialogPaperStyles,
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={dialogTitleStyles}>
        {t("confirmAction")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={dialogContentStyles}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={dialogActionsStyles}>
        <Button onClick={onCancel} color="primary" sx={buttonStyles}>
          {t("cancel")}
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          sx={buttonStyles}
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPopup;

const dialogPaperStyles: SxProps<Theme> = {
  backgroundColor: (theme) =>
    theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
  borderRadius: "12px",
};

const dialogTitleStyles: SxProps<Theme> = {
  color: (theme) => (theme.palette.mode === "light" ? "#1a237e" : "#90caf9"),
};

const dialogContentStyles: SxProps<Theme> = {
  color: (theme) => (theme.palette.mode === "light" ? "#333333" : "#e0e0e0"),
};

const dialogActionsStyles: SxProps<Theme> = {
  padding: "16px 24px",
};

const buttonStyles: SxProps<Theme> = {
  textTransform: "none",
  fontWeight: "bold",
};
