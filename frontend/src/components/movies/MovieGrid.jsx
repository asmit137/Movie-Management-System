import { Grid, Box, Pagination } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies,
  page,
  pages,
  isAdmin = false,
  onEdit,
  onDelete,
  onPageChange
}) {
  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          "@media (max-width:900px)": {
            spacing: 2
          }
        }}
      >
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <MovieCard
              movie={movie}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>

      {pages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={pages}
            page={page}
            onChange={(_, v) => onPageChange(v)}
          />
        </Box>
      )}
    </>
  );
}
