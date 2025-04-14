import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Box, CircularProgress, Paper } from "@mui/material";

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/users/login", loginCredentials, {
        withCredentials: true,
      });
      setTimeout(()=> {
        setLoading(false);
        navigate("/profile")}, 1500)
    } catch (err) {
      setLoading(false);
      setErrorMessage(`${err.response?.data?.message}, Please try again` || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-white to-blue-100">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 400,
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom align="left">
          Hustler Login
        </Typography>

        {errorMessage && (
          <Typography variant="body2" color="error" align="center" mb={2}>
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={loginCredentials.email}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={loginCredentials.password}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "30px", textTransform: "none", py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={3} color="text.secondary">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;
