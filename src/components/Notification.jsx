import { useTheme } from "@emotion/react";
import { Snackbar } from "@mui/material";

const Notification = ({ message, severity }) => {
  const theme = useTheme();
  if (message !== null) {
    return (
      <Snackbar
        open={Boolean(message)}
        message={message}
        ContentProps={{
          sx: {
            color: "white",
            backgroundColor: theme.palette[severity].main,
          },
        }}
      />
    );
  }
  return null;
};

export default Notification;
