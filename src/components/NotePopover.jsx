import { Button, Popover, Typography } from "@mui/material";
import { useState } from "react";

const NotePopover = ({ noteToPopover }) => {
  const [noteAnchorEl, setNoteAnchorEl] = useState(null);
  const [noteContent, setNoteContent] = useState(null);
  const noteOpen = Boolean(noteAnchorEl);
  const noteHandleClose = () => {
    setNoteAnchorEl(null);
  };
  const noteHandleOpen = (note, event) => {
    setNoteContent(note);
    setNoteAnchorEl(event.target);
  };
  return (
    <>
      <Button
        sx={{ padding: 0 }}
        onClick={(event) => noteHandleOpen(noteToPopover, event)}
      >
        view
      </Button>
      <Popover
        open={noteOpen}
        anchorEl={noteAnchorEl}
        onClose={noteHandleClose}
      >
        <Typography>
          {noteContent !== "" ? noteContent : "(no note)"}
        </Typography>
      </Popover>
    </>
  );
};

export default NotePopover;
