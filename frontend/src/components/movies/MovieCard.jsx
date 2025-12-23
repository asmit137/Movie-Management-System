import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button
} from "@mui/material";

const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

export default function MovieCard({
  movie,
  isAdmin = false,
  onEdit,
  onDelete
}) {
  return (
    <Card
      sx={{
        width: 900, 
        height: 220,
        mx: "auto",
        mb: 2,
        p: 2,
        display: "flex",
        gap: 2,
        borderRadius: 2,
        overflow: "hidden",

        "@media (max-width:900px)": {
          width: "95%",
          height: "auto",
          flexDirection: "column",
          mx: "auto",
          mb: 2,
          p: 1.5,
        }
      }}
    >
      {/* Poster */}
      <Box
        component="img"
        src={movie.poster}
        alt={movie.title}
        sx={{
          width: 140,
          height: 200,
          objectFit: "cover",
          borderRadius: 1,
          flexShrink: 0,

          "@media (max-width:900px)": {
            width: "100%",
            height: 240,
          }
        }}
      />

      {/* Content */}
      <CardContent
        sx={{
          p: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",

          "@media (max-width:900px)": {
            flexGrow: 0,
            mt: 1,
          }
        }}
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            "@media (max-width:900px)": {
              fontSize: "1.2rem",
            }
          }}
        >
          {movie.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            "@media (max-width:900px)": {
              fontSize: "0.85rem",
              mt: 0.3
            }
          }}
        >
          {formatDate(movie.releaseDate)} • {movie.duration} min
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 1,
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",

            "@media (max-width:900px)": {
              flexGrow: 0,
              mt: 0.5,
              fontSize: "0.9rem"
            }
          }}
        >
          {movie.description}
        </Typography>

        <Box mt={1} display="flex" gap={1} alignItems="center">
          <Chip label={`⭐ ${movie.rating}/10`} size="small" />
        </Box>

        {isAdmin && (
          <Box mt={1} display="flex" gap={1} flexWrap="wrap">
            <Button
              size="small"
              variant="outlined"
              onClick={() => onEdit(movie)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => onDelete(movie._id)}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
