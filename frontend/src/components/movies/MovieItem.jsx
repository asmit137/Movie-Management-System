import {
    Card,
    CardContent,
    Typography,
    Button,
    Box
  } from "@mui/material";
  
  export default function MovieItem({ movie, onEdit, onDelete }) {
    return (
      <Card>
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ width: "100%", height: 200, objectFit: "cover" }}
        />
  
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
  
          <Typography variant="body2" color="text.secondary">
            {movie.description?.slice(0, 80)}...
          </Typography>
  
          <Typography variant="body2">
            Rating: {movie.rating}/10
          </Typography>
  
          <Typography variant="body2">
            Duration: {movie.duration} min
          </Typography>
  
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button size="small" onClick={onEdit}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={onDelete}>
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
  