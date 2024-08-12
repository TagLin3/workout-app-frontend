import {
  Box, Typography, TextField, Button,
} from "@mui/material";

const SetEditForm = ({ setToEdit, setSetToEdit, finishEditingSet }) => (
  <form onSubmit={(event) => finishEditingSet(event, setToEdit)}>
    <Box
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h5">
        Edit set
        {" "}
        {setToEdit.number}
        :
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
      >
        <TextField
          sx={{ flexGrow: 1 }}
          label="reps"
          type="number"
          name="reps"
          value={setToEdit.reps}
          onChange={(event) => setSetToEdit({ ...setToEdit, reps: event.target.value })}
        />
        <TextField
          sx={{ flexGrow: 1 }}
          label="weight"
          type="number"
          name="weight"
          value={setToEdit.weight}
          onChange={(event) => setSetToEdit({ ...setToEdit, weight: event.target.value })}
        />
      </Box>
      <TextField
        label="rest after set in seconds"
        type="number"
        name="rest"
        value={setToEdit.rest}
        onChange={(event) => setSetToEdit({ ...setToEdit, rest: event.target.value })}
      />
      <TextField
        label="note"
        name="note"
        multiline
        value={setToEdit.note}
        onChange={(event) => setSetToEdit({ ...setToEdit, note: event.target.value })}
      />
      <Box
        display="flex"
        flexDirection="row"

      >
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          type="submit"
        >
          edit
        </Button>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => setSetToEdit(null)}
          color="error"
        >
          cancel
        </Button>
      </Box>
    </Box>
  </form>
);

export default SetEditForm;
