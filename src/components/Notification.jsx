import { Alert } from "@mui/material";

const Notification = ({ message, severity }) => (
  message !== null
  && (
    <Alert severity={severity}>
      {message}
    </Alert>
  )
);

export default Notification;
