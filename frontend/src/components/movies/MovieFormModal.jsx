import { useEffect, useState } from "react";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";

export default function MovieFormModal({
  open,
  onClose,
  movie,
  onSubmit,
  loading
}) {
  const initialForm = {
    title: "",
    description: "",
    rating: "",
    duration: "",
    releaseDate: "",
    poster: "",
    file: null
  };

  const [form, setForm] = useState(initialForm);

  // ✅ Reset form whenever modal opens
  useEffect(() => {
    if (open) {
      if (movie) {
        setForm({
          ...movie,
          releaseDate: movie.releaseDate?.split("T")[0],
          file: null
        });
      } else {
        setForm(initialForm);
      }
    }
  }, [open, movie]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setForm({ ...form, file: e.target.files[0] });

  const submit = () => {
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => v && data.append(k, v));
    console.log("Submitting form data:", form, data);
    onSubmit(data);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    maxWidth: "95%",
    bgcolor: "background.paper",
    p: 4,
    borderRadius: 2,
    overflowY: "auto",
    maxHeight: "90vh",
    "@media (max-width:600px)": {
      p: 2
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {movie ? "Edit Movie" : "Add Movie"}
        </Typography>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          sx={{ mt: 2 }}
          multiline
          minRows={3}
        />
        <TextField
          fullWidth
          type="number"
          label="Rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          type="number"
          label="Duration"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          name="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Poster URL"
          name="poster"
          value={form.poster}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <input type="file" onChange={handleFile} style={{ marginTop: 12 }} />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Modal>
  );
}
