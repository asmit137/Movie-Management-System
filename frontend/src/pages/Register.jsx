import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/authSchema";
import {
  TextField,
  Button,
  Box,
  Alert
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser, clearError } from "../features/auth/authSlice";

export default function Register({ onSuccess }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    const res = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(res)) {
      onSuccess(); // switch to login tab
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          onChange={() => dispatch(clearError())}
        />

        <TextField
          label="Email"
          fullWidth
          sx={{ mt: 2 }}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          onChange={() => dispatch(clearError())}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          onChange={() => dispatch(clearError())}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Box>
  );
}
