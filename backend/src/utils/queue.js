import Movie from "../models/Movie.js";

const movieQueue = [];
const FAILED_JOBS = [];

export const addToMovieQueue = (data) => {
  movieQueue.push({ data, retries: 0, maxRetries: 3 });
};

export const startMovieQueueWorker = () => {
  setInterval(async () => {
    if (!movieQueue.length) return;

    const job = movieQueue.shift();
    try {
      await Movie.create(job.data);
      console.log("Movie inserted:", job.data.title);
    } catch (err) {
      job.retries++;
      if (job.retries <= job.maxRetries) {
        movieQueue.push(job);
      } else {
        FAILED_JOBS.push({ ...job, error: err.message });
        console.error("Movie failed:", job.data.title);
      }
    }
  }, 3000);
};
