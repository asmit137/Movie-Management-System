import * as yup from "yup";

export const movieSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  rating: yup.number().min(0).max(10).required(),
  duration: yup.number().positive().required(),
  releaseDate: yup.date().required(),
  poster: yup.string().required()
});
